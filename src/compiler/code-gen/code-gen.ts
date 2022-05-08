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

  constructor(ast: Ast) {
    this.gen = new Generator();
    this.gen.genInit();

    const valueAllocator = new ValueAllocator(this.gen);

    const varIdMap = new Map<string, number>();
    const newTmpId = () => valueAllocator.allocateId();
    const getVarId = (varName: string) =>
      varIdMap.get(varName) !== undefined ? varIdMap.get(varName)! : varIdMap.set(varName, valueAllocator.allocateId()).get(varName)!;

    const genExpression = (expr: Expression): number => {
      if (expr instanceof BinaryExpression) {
        if (!(expr.leftExpression instanceof LiteralExpression) && expr.rightExpression instanceof LiteralExpression) {
          const id = genExpression(expr.leftExpression);
          const reg = valueAllocator.ensureOnRegister(id);
          this.gen.genRegLitComputation(expr.operation, expr.rightExpression.value, reg);
          return id;
        } else if (expr.leftExpression instanceof LiteralExpression && !(expr.rightExpression instanceof LiteralExpression)) {
          if (expr.operation === '-' || expr.operation === '<' || expr.operation === '>') {
            const id1 = genExpression(expr.leftExpression);
            const id2 = genExpression(expr.rightExpression);
            const srcReg = valueAllocator.ensureOnRegister(id1);
            const dstReg = valueAllocator.ensureOnRegister(id2, true, [srcReg]);
            valueAllocator.deallocId(id1);
            this.gen.genRegToRegComputation(expr.operation, srcReg, dstReg, dstReg);
            return id2;
          } else {
            const id2 = genExpression(expr.rightExpression);
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
          const id1 = genExpression(expr.leftExpression);
          const id2 = genExpression(expr.rightExpression);
          const srcReg = valueAllocator.ensureOnRegister(id1);
          const dstReg = valueAllocator.ensureOnRegister(id2, true, [srcReg]);
          valueAllocator.deallocId(id1);
          this.gen.genRegToRegComputation(expr.operation, srcReg, dstReg, dstReg);
          return id2;
        }
      } else if (expr instanceof AssignExpression) {
        const dstVar = expr.varRef.varName;
        const dstId = getVarId(dstVar);
        const srcId = genExpression(expr.expression);
        valueAllocator.moveValue(srcId, dstId);
        return dstId;
      } else if (expr instanceof CallExpression) {
        if (expr.paramExpressions.length !== 1)
          throw new Error('At this point, code gen doesnt support multiple params on call expression');
        const id = genExpression(expr.paramExpressions[0]);
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
          const id = genExpression(expr.expression);
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
    };

    const genStatements = (statements: Statement[]) => {
      for (const statement of statements) {
        if (statement instanceof ExpressionStatement) {
          genExpression(statement.expression);
        } else if (statement instanceof IfStatement) {
          /*const ifNum = nextIfNum++;
          const tmpId = valueAllocator.getTmpId(nextTmpNum++);
          genExpression(statement.conditionExpression, tmpId);
          const tmpReg = valueAllocator.ensureOnRegister(tmpId);
          valueAllocator.deallocateId(tmpId);
          this.genJmpIfRegIsNotZero(tmpReg, `if_${ifNum}`);
          if (statement.elseStatements) {
            this.genSymbol(`else_${ifNum}`);
            genStatements(statement.elseStatements);
            this.genJmp(`if_end_${ifNum}`);
          }
          if (statement.ifStatements) {
            this.genSymbol(`if_${ifNum}`);
            genStatements(statement.ifStatements);
          }
          this.genSymbol(`if_end_${ifNum}`);*/
          throw new Error('If statement has bugs...');
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
    };

    genStatements(ast.statements);

    //console.log(valueAllocator);
    //console.log('code length', this.gen.code.length);

    this.gen.genEnd();
  }
}
