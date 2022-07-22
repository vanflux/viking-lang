import {
  AddExpression,
  AssignExpression,
  Ast,
  BinaryExpression,
  CallExpression,
  Expression,
  ExpressionStatement,
  IfStatement,
  LiteralExpression,
  NegateExpression,
  RelationalExpression,
  Statement,
  VarReference,
  WhileStatement,
} from '../ast';
import { Generator } from './generator';
import { ValueAllocator } from './value-allocator';

export class CodeGen {
  gen: Generator;
  varIdMap: Map<string, number>;
  nextIfNum = 0;

  constructor(ast: Ast) {
    this.gen = new Generator();
    this.varIdMap = new Map<string, number>();

    const valueAllocator = new ValueAllocator(this.gen);
    this.gen.genInit();
    this.genStatements(ast.statements, valueAllocator);
    this.gen.genEnd();

    //console.log(valueAllocator);
    //console.log(this.varIdMap);
    //console.log('code length', this.gen.code.length);
  }

  private genExpression(expr: Expression, valueAllocator: ValueAllocator): number {
    // TODO: remove duplicated code
    const newTmpId = () => valueAllocator.allocateId();
    const getVarId = (varName: string) => {
      if (this.varIdMap.get(varName) === undefined) this.varIdMap.set(varName, valueAllocator.allocateId());
      return this.varIdMap.get(varName)!;
    };
    if (expr instanceof BinaryExpression) {
      if (!(expr.leftExpression instanceof LiteralExpression) && expr.rightExpression instanceof LiteralExpression) {
        const id = this.genExpression(expr.leftExpression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        this.gen.genRegLitComputation(expr.operation, expr.rightExpression.value, reg);
        return id;
      } else if (expr.leftExpression instanceof LiteralExpression && !(expr.rightExpression instanceof LiteralExpression)) {
        if (expr.operation === '-' || expr.operation === '<' || expr.operation === '>') {
          const id1 = this.genExpression(expr.leftExpression, valueAllocator);
          const id2 = this.genExpression(expr.rightExpression, valueAllocator);
          const srcReg = valueAllocator.ensureOnRegister(id1);
          const dstReg = valueAllocator.ensureOnRegister(id2, true, [srcReg]);
          valueAllocator.deallocId(id1);
          this.gen.genRegToRegComputation(expr.operation, srcReg, dstReg, dstReg);
          return id2;
        } else {
          const id2 = this.genExpression(expr.rightExpression, valueAllocator);
          const dstReg = valueAllocator.ensureOnRegister(id2);
          this.gen.genRegLitComputation(expr.operation, expr.leftExpression.value, dstReg);
          return id2;
        }
      } else if (expr.leftExpression instanceof LiteralExpression && expr.rightExpression instanceof LiteralExpression) {
        const id = newTmpId();
        switch (expr.operation) {
          case '+':
            valueAllocator.setLiteral(id, expr.leftExpression.value + expr.rightExpression.value);
            break;
          case '-':
            valueAllocator.setLiteral(id, expr.leftExpression.value - expr.rightExpression.value);
            break;
          case '<':
            valueAllocator.setLiteral(id, expr.leftExpression.value < expr.rightExpression.value ? 1 : 0);
            break;
          case '>':
            valueAllocator.setLiteral(id, expr.leftExpression.value > expr.rightExpression.value ? 1 : 0);
            break;
          default:
            throw new Error('Unsupported computation expression operator');
        }
        return id;
      } else {
        const id1 = this.genExpression(expr.leftExpression, valueAllocator);
        const id2 = this.genExpression(expr.rightExpression, valueAllocator);
        const srcReg = valueAllocator.ensureOnRegister(id1);
        const dstReg = valueAllocator.ensureOnRegister(id2, true, [srcReg]);
        valueAllocator.deallocId(id1);
        this.gen.genRegToRegComputation(expr.operation, srcReg, dstReg, dstReg);
        return id2;
      }
    } else if (expr instanceof AssignExpression) {
      const dstVar = expr.varRef.varName;
      const dstId = getVarId(dstVar);
      const srcId = this.genExpression(expr.expression, valueAllocator);
      valueAllocator.moveValue(srcId, dstId);
      valueAllocator.ensureOnRegister(dstId);
      return dstId;
    } else if (expr instanceof CallExpression) {
      if (expr.paramExpressions.length !== 1)
        throw new Error('At this point, code gen doesnt support multiple params on call expression');
      const id = this.genExpression(expr.paramExpressions[0], valueAllocator);
      const reg = valueAllocator.ensureOnRegister(id);
      valueAllocator.deallocId(id);
      switch (expr.funcName) {
        case 'printc':
          this.gen.genPrintChar(reg);
          break;
        case 'printn':
          this.gen.genPrintNumber(reg);
          break;
        default:
          throw new Error('Function not found: ' + expr.funcName);
      }
      return id;
    } else if (expr instanceof NegateExpression) {
      if (expr.expression instanceof LiteralExpression) {
        const id = newTmpId();
        valueAllocator.setLiteral(id, -expr.expression.value);
        return id;
      } else {
        const id = this.genExpression(expr.expression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        this.gen.genRegNegate(reg);
        return id;
      }
    } else if (expr instanceof VarReference) {
      const id = newTmpId();
      valueAllocator.setValue(getVarId(expr.varName), id);
      return id;
    } else if (expr instanceof LiteralExpression) {
      const id = newTmpId();
      valueAllocator.setLiteral(id, expr.value);
      return id;
    }
    throw new Error('Unsupported expression');
  }

  private genStatements(statements: Statement[], valueAllocator: ValueAllocator) {
    const getVarId = (varName: string) => {
      if (this.varIdMap.get(varName) === undefined) this.varIdMap.set(varName, valueAllocator.allocateId());
      return this.varIdMap.get(varName)!;
    };

    statements.forEach(statement => {
      statement.process(node => {
        if (!(node instanceof VarReference)) return;
        const id = getVarId(node.varName);
        valueAllocator.allocStackPos(id);
      });
    });

    for (const statement of statements) {
      if (statement instanceof ExpressionStatement) {
        this.genExpression(statement.expression, valueAllocator);
      } else if (statement instanceof IfStatement) {
        const ifNum = this.nextIfNum++;
        const id = this.genExpression(statement.conditionExpression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        valueAllocator.deallocId(id);
        this.gen.genJmpIfRegIsNotZero(reg, `if_${ifNum}`);
        const elseValueAllocator = valueAllocator.fork();
        const ifValueAllocator = valueAllocator.fork();
        if (statement.elseStatements) {
          this.gen.genSymbol(`else_${ifNum}`);
          this.genStatements(statement.elseStatements, elseValueAllocator);
          elseValueAllocator.converge(valueAllocator);
          this.gen.genJmp(`if_end_${ifNum}`);
        }
        if (statement.ifStatements) {
          this.gen.genSymbol(`if_${ifNum}`);
          this.genStatements(statement.ifStatements, ifValueAllocator);
          ifValueAllocator.converge(valueAllocator);
        }
        this.gen.genSymbol(`if_end_${ifNum}`);
      } else if (statement instanceof WhileStatement) {
        /*const whileNum = nextWhileNum++;
        if (!statement.executeFirst) this.genJmp(`while_cond_${whileNum}`);
        this.genSymbol(`while_start_${whileNum}`);
        genStatements(statement.statements);
        this.genSymbol(`while_cond_${whileNum}`);
        const tmpId = valueAllocator.getTmpId(nextTmpNum++);
        genExpression(statement.conditionExpression, tmpId);
        const tmpReg = valueAllocator.ensureOnRegister(tmpId);
        valueAllocator.deallocateId(tmpId);
        this.genJmpIfRegIsNotZero(tmpReg, `while_start_${whileNum}`);
        this.genSymbol(`while_end_${whileNum}`);*/
        throw new Error('While statement has bugs...');
      }
    }
  }
}
