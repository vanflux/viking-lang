import { Architecture } from '../../common';
import {
  AddExpression,
  AssignExpression,
  Ast,
  BinaryExpression,
  CallExpression,
  Expression,
  ExpressionStatement,
  IfStatement,
  NumberLiteralExpression,
  StringLiteralExpression,
  NegateExpression,
  RelationalExpression,
  Statement,
  VarReference,
  WhileStatement,
  ArrayLiteralExpression,
  ArrayAccessExpression,
} from '../ast';
import { Generator } from './generator';
import { ValueAllocator } from './value-allocator';

export class CodeGen {
  gen: Generator;
  varIdMap = new Map<string, number>();
  nextIfNum = 0;
  nextWhileNum = 0;
  nextStringLiteralNum = 0;
  nextArrayLiteralNum = 0;
  stringLiteralData = new Map<string, string>(); // Symbol per string value
  arrayLiteralData = new Map<string, number[]>(); // Array literal data per symbol

  constructor(private architecture: Architecture, private ast: Ast) {
    this.gen = new Generator(this.architecture);
    const registers = this.architecture.getRegisters();
    const generalPurposeRegisters = registers.filter(r => r.aliases.length === 0).map(r => r.name);
    const valueAllocator = new ValueAllocator(generalPurposeRegisters, this.gen);
    this.gen.genInit();
    this.genStatements(this.ast.statements, valueAllocator);
    this.gen.genEnd();
    this.genStringLiteralData();
    this.genArrayLiteralData();

    //console.log(valueAllocator);
    //console.log(this.varIdMap);
    //console.log('code length', this.gen.code.length);
  }

  private addArrayLiteralData(values: number[]) {
    const symbol = 'arr_lit_' + this.nextArrayLiteralNum++;
    this.arrayLiteralData.set(symbol, values);
    return symbol;
  }

  private addStringLiteralData(value: string) {
    if (this.stringLiteralData.has(value)) return this.stringLiteralData.get(value)!;
    const symbol = 'str_lit_' + this.nextStringLiteralNum++;
    this.stringLiteralData.set(value, symbol);
    return symbol;
  }

  private genExpression(expr: Expression, valueAllocator: ValueAllocator): number {
    // TODO: remove duplicated code
    const newTmpId = () => valueAllocator.allocateId();
    const getVarId = (varName: string) => {
      if (this.varIdMap.get(varName) === undefined) this.varIdMap.set(varName, valueAllocator.allocateId());
      return this.varIdMap.get(varName)!;
    };
    if (expr instanceof BinaryExpression) {
      if (!(expr.leftExpression instanceof NumberLiteralExpression) && expr.rightExpression instanceof NumberLiteralExpression) {
        const id = this.genExpression(expr.leftExpression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        this.gen.genRegLitComputation(expr.operation, expr.rightExpression.value, reg);
        valueAllocator.informChanged(id);
        return id;
      } else if (expr.leftExpression instanceof NumberLiteralExpression && !(expr.rightExpression instanceof NumberLiteralExpression)) {
        if (expr.operation === '-' || expr.operation === '<' || expr.operation === '>') {
          const id1 = this.genExpression(expr.leftExpression, valueAllocator);
          const id2 = this.genExpression(expr.rightExpression, valueAllocator);
          const srcReg = valueAllocator.ensureOnRegister(id1);
          const dstReg = valueAllocator.ensureOnRegister(id2, true, [srcReg]);
          valueAllocator.deallocId(id1);
          this.gen.genRegToRegComputation(expr.operation, srcReg, dstReg, dstReg);
          valueAllocator.informChanged(id2);
          return id2;
        } else {
          const id2 = this.genExpression(expr.rightExpression, valueAllocator);
          const dstReg = valueAllocator.ensureOnRegister(id2);
          this.gen.genRegLitComputation(expr.operation, expr.leftExpression.value, dstReg);
          valueAllocator.informChanged(id2);
          return id2;
        }
      } else if (expr.leftExpression instanceof NumberLiteralExpression && expr.rightExpression instanceof NumberLiteralExpression) {
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
        valueAllocator.informChanged(id2);
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
      if (expr.paramExpressions.length !== 1) throw new Error('At this point, code gen doesnt support multiple params on call expression');
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
      if (expr.expression instanceof NumberLiteralExpression) {
        const id = newTmpId();
        valueAllocator.setLiteral(id, -expr.expression.value);
        return id;
      } else {
        const id = this.genExpression(expr.expression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        this.gen.genRegNegate(reg);
        valueAllocator.informChanged(id);
        return id;
      }
    } else if (expr instanceof VarReference) {
      const id = newTmpId();
      valueAllocator.setValue(getVarId(expr.varName), id);
      return id;
    } else if (expr instanceof NumberLiteralExpression) {
      const id = newTmpId();
      valueAllocator.setLiteral(id, expr.value);
      return id;
    } else if (expr instanceof StringLiteralExpression) {
      const id = newTmpId();
      valueAllocator.setLiteral(id, this.addStringLiteralData(expr.value));
      return id;
    } else if (expr instanceof ArrayLiteralExpression) {
      const id = newTmpId();
      if (expr.expressions.some(x => !(x instanceof NumberLiteralExpression))) throw new Error('Only number literals are allowed on global array declarations');
      const numberLiteralExpressions = expr.expressions as NumberLiteralExpression[];
      const values = numberLiteralExpressions.map(x => x.value);
      valueAllocator.setLiteral(id, this.addArrayLiteralData(values));
      return id;
    } else if (expr instanceof ArrayAccessExpression) {
      const id = newTmpId();
      let arrayId, array, offsetId, offset, arrayIsReg = false, offsetIsReg = false;
      let blacklist: string[] = [];
      if (expr.array instanceof NumberLiteralExpression) {
        array = expr.array.value;
      } else {
        arrayId = this.genExpression(expr.array, valueAllocator);
        array = valueAllocator.ensureOnRegister(arrayId, true, blacklist);
        arrayIsReg = true;
        blacklist.push(array);
      }
      if (expr.offset instanceof NumberLiteralExpression) {
        offset = expr.offset.value;
      } else {
        offsetId = this.genExpression(expr.offset, valueAllocator);
        offset = valueAllocator.ensureOnRegister(offsetId, true, blacklist);
        offsetIsReg = true;
        blacklist.push(offset);
      }
      const destReg = valueAllocator.ensureOnRegister(id, false, blacklist);
      if (arrayId !== undefined) valueAllocator.deallocId(arrayId);
      if (offsetId !== undefined) valueAllocator.deallocId(offsetId);
      this.gen.genOffsetMemToRegMov(offset, offsetIsReg, array, arrayIsReg, destReg);
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
        const whileNum = this.nextWhileNum++;
        this.gen.genSymbol(`while_start_${whileNum}`);
        const initialValueAllocator = valueAllocator.fork();
        const id = this.genExpression(statement.conditionExpression, valueAllocator);
        const reg = valueAllocator.ensureOnRegister(id);
        valueAllocator.deallocId(id);
        this.gen.genJmpIfRegIsZero(reg, `while_end_${whileNum}`);
        this.genStatements(statement.statements, valueAllocator);
        valueAllocator.converge(initialValueAllocator);
        this.gen.genJmp(`while_start_${whileNum}`);
        this.gen.genSymbol(`while_end_${whileNum}`);
      } else {
        throw new Error('Unsupported statement');
      }
    }
  }

  private genStringLiteralData() {
    this.stringLiteralData.forEach((symbol, value) => this.gen.genStringLiteral(symbol, value));
  }

  private genArrayLiteralData() {
    this.arrayLiteralData.forEach((values, symbol) => this.gen.genNumbersLiteral(symbol, values));
  }
}
