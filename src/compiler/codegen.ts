import {
  AddExpression,
  AssignExpression,
  Ast,
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
} from './ast';

export class CodeGen {
  code: string[] = [];

  // Code gen

  genInit() {
    this.code.push('main');
    this.code.push('mov r6, r7'); // Base Stack Pointer = Current Stack Pointer
  }

  genEnd() {
    this.code.push('hcf');
  }

  genStackToRegMov(wpos: number, destReg: string) {
    if (wpos == 0) {
      this.code.push(`ldw ${destReg}, r6`); // Load stack value to destReg
    } else {
      this.code.push('mov r5, r6'); // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`); // Adjust TEMPORARY POINTER
      this.code.push(`ldw ${destReg}, r5`); // Load stack value to destReg
    }
  }

  genRegToStackMov(wpos: number, reg: string) {
    if (wpos == 0) {
      this.code.push(`stw ${reg}, r6`); // Save srcReg value on stack
    } else {
      this.code.push('mov r5, r6'); // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`); // Adjust TEMPORARY POINTER
      this.code.push(`stw ${reg}, r5`); // Save srcReg value on stack
    }
  }

  genLitToRegMov(literal: number, reg: string) {
    if (literal >= 128 && literal <= 255) {
      this.code.push(`ldc ${reg}, 0`);
      this.code.push(`ldc ${reg}, ${literal}`);
    } else {
      this.code.push(`ldi ${reg}, ${literal}`);
    }
  }

  genRegToRegMov(src: string, dest: string) {
    this.code.push(`mov ${dest}, ${src}`);
  }

  genRegToRegMath(operation: '+' | '-', src1: string, src2: string, dest: string) {
    this.code.push(`${operation === '+' ? 'add' : 'sub'} ${dest}, ${src1}, ${src2}`);
  }

  genRegLitMath(operation: '+' | '-', literal: number, dest: string) {
    this.code.push(`${operation === '+' ? 'add' : 'sub'} ${dest}, ${literal}`);
  }

  genRegLessThanRegTest(reg1: string, reg2: string, dest: string) {
    this.code.push(`slt ${dest}, ${reg1}, ${reg2}`);
  }

  genRegNegate(reg: string) {
    this.code.push(`neg ${reg}`);
  }

  genJmpIfRegIsNotZero(reg: string, symbol: string) {
    this.code.push(`bnz ${reg}, ${symbol}`);
  }

  genJmp(symbol: string) {
    this.code.push(`bnz r7, ${symbol}`);
  }

  genSymbol(symbolName: string) {
    this.code.push(`${symbolName}`);
  }

  genPrintChar(reg: string) {
    this.code.push(`stw ${reg}, 0xf000`);
  }

  genPrintNumber(reg: string) {
    this.code.push(`stw ${reg}, 0xf002`);
  }

  genComment(comment: string) {
    this.code.push(`// ${comment}`);
  }

  constructor(ast: Ast) {
    this.genInit();
    const self = this;

    type AllocableValue = (
      | {
          type: 'tmp';
          num: number;
        }
      | {
          type: 'var';
          varName: string;
        }
    ) & {
      id: number;
      changed: boolean;
      register?: string;
      stackPos?: number;
    };

    class ValueAllocator {
      private tmpToID = new Map<number, number>();
      private varToId = new Map<string, number>();
      private allocables: AllocableValue[] = [];
      private usedStackPoses = new Set<number>();
      private availableRegisters = ['r1', 'r2', 'r3', 'r4'];
      private nextId = 0;

      private getAllocable(id: number) {
        const allocable = this.allocables.find(x => x.id === id);
        if (!allocable) throw new Error('Load on register allocable not found');
        return allocable;
      }

      private allocStackPos(allocable: AllocableValue) {
        let stackPos = 0;
        while (this.usedStackPoses.has(stackPos)) stackPos += 2;
        this.usedStackPoses.add(stackPos);
        allocable.stackPos = stackPos;
        return stackPos;
      }

      private freeRegister(blacklist: string[]) {
        if (this.availableRegisters.length > 0) return this.availableRegisters.shift()!;
        // TODO: deallocate the less used...
        // needs some modifications on set value, when setting -> we need
        // blacklist the two registers involved on set from deallocation
        const oldAllocable = this.allocables.find(x => x.register && !blacklist.includes(x.register));
        if (!oldAllocable) throw new Error('Compiler tried to allocate too many registers');
        const register = oldAllocable.register!;
        if (oldAllocable.changed) {
          const stackPos = oldAllocable.stackPos != undefined ? oldAllocable.stackPos : this.allocStackPos(oldAllocable);
          self.genRegToStackMov(stackPos, register);
        }
        oldAllocable.register = undefined;
        return register;
      }

      private loadOnRegister(id: number, blacklist: string[]=[], loadFromStack = true) {
        const allocable = this.getAllocable(id);
        const register = this.freeRegister(blacklist);
        if (allocable.stackPos != undefined && loadFromStack) {
          self.genStackToRegMov(allocable.stackPos, register);
        }
        allocable.register = register;
        return register;
      }

      ensureOnRegister(id: number, blacklist: string[]=[]) {
        const allocable = this.getAllocable(id);
        if (allocable.register) return allocable.register;
        return this.loadOnRegister(id, blacklist, true);
      }

      setLiteral(id: number, literal: number, blacklist: string[]=[]) {
        const allocable = this.getAllocable(id);
        if (allocable.register) {
          self.genLitToRegMov(literal, allocable.register);
        } else {
          const register = this.loadOnRegister(id, blacklist, false);
          self.genLitToRegMov(literal, register);
          allocable.changed = true;
        }
      }

      setValue(dstId: number, srcId: number) {
        if (dstId === srcId) return;

        const dstAllocable = this.getAllocable(dstId);
        const srcAllocable = this.getAllocable(srcId);

        // If isnt initialized, allocate some register
        if (!dstAllocable.register && dstAllocable.stackPos == undefined) this.loadOnRegister(dstId);

        if (srcAllocable.register) {
          if (dstAllocable.register) {
            self.genRegToRegMov(srcAllocable.register, dstAllocable.register);
          } else if (dstAllocable.stackPos != undefined) {
            self.genRegToStackMov(dstAllocable.stackPos, srcAllocable.register);
          }
        } else if (srcAllocable.stackPos != undefined) {
          if (dstAllocable.register) {
            self.genStackToRegMov(srcAllocable.stackPos, dstAllocable.register);
          } else if (dstAllocable.stackPos != undefined) {
            this.loadOnRegister(dstId);
            self.genStackToRegMov(srcAllocable.stackPos, dstAllocable.register!);
          } else {
            throw new Error('Unhandled compiler set value case');
          }
        } else {
          throw new Error('Tried to set a value from a src that isnt initialized');
        }
      }

      informChanged(id: number) {
        const allocable = this.getAllocable(id);
        allocable.changed = true;
      }

      getVarId(varName: string) {
        const id = this.varToId.get(varName);
        if (id != undefined) return id;
        const allocable: AllocableValue = {
          id: this.nextId++,
          changed: false,
          type: 'var',
          varName,
        };
        this.varToId.set(varName, allocable.id);
        this.allocables.push(allocable);
        return allocable.id;
      }

      getTmpId(num: number) {
        const id = this.tmpToID.get(num);
        if (id != undefined) return id;
        const allocable: AllocableValue = {
          id: this.nextId++,
          changed: false,
          type: 'tmp',
          num,
        };
        this.tmpToID.set(num, allocable.id);
        this.allocables.push(allocable);
        return allocable.id;
      }

      deallocateId(id: number) {
        const index = this.allocables.findIndex(x => x.id === id);
        const allocable = this.allocables[index];
        if (allocable.register) this.availableRegisters.unshift(allocable.register);
        if (allocable.stackPos != undefined) this.usedStackPoses.delete(allocable.stackPos);
        if (allocable.type === 'var') {
          this.varToId.delete(allocable.varName);
        } else {
          this.tmpToID.delete(allocable.num);
        }
        allocable.register = undefined;
        allocable.stackPos = undefined;
        this.allocables.splice(index, 1);
      }
    }

    const valueAllocator = new ValueAllocator();
    let nextTmpNum = 0;
    let nextIfNum = 0;
    let nextWhileNum = 0;

    const genExpression = (expr: Expression, outId?: number): {type: 'literal' | 'non-literal', value: number, tmp: boolean} => {
      if (expr instanceof AddExpression) {
        const {type: type1, value: value1, tmp: tmp1} = genExpression(expr.leftExpression, outId);
        let type2, value2, tmp2, tmpAux: number | undefined;
        if (type1 == 'non-literal' && !tmp1) {
          tmpAux = valueAllocator.getTmpId(nextTmpNum++);
          ({type: type2, value: value2, tmp: tmp2} = genExpression(expr.rightExpression, tmpAux));
          if (type2 == 'literal') valueAllocator.deallocateId(tmpAux);
        } else {
          ({type: type2, value: value2, tmp: tmp2} = genExpression(expr.rightExpression, outId));
        }
        
        if (type1 === 'literal' && type2 === 'literal') {
          if (expr.operation === '+') {
            return { type: 'literal', value: value1 + value2, tmp: false };
          } else {
            return { type: 'literal', value: value1 - value2, tmp: false };
          }
        } else if (type1 === 'literal' && type2 === 'non-literal') {
          if (expr.operation === '-') {
            if (outId != undefined) {
              const tmpId = valueAllocator.getTmpId(nextTmpNum++);
              valueAllocator.setLiteral(tmpId, value1);
              const regTmp = valueAllocator.ensureOnRegister(tmpId);
              const regOut = valueAllocator.ensureOnRegister(outId, [regTmp]);
              const reg2 = valueAllocator.ensureOnRegister(value2, [regTmp, regOut]);
              this.genRegToRegMath(expr.operation, regTmp, reg2, regOut);
              valueAllocator.informChanged(outId);
              if (tmp2) valueAllocator.deallocateId(value2);
              valueAllocator.deallocateId(tmpId);
              return { type: 'non-literal', value: outId, tmp: false };
            } else {
              const tmpId = valueAllocator.getTmpId(nextTmpNum++);
              valueAllocator.setLiteral(tmpId, value1);
              const regTmp = valueAllocator.ensureOnRegister(tmpId);
              const reg2 = valueAllocator.ensureOnRegister(value2, [regTmp]);
              this.genRegToRegMath(expr.operation, regTmp, reg2, regTmp);
              valueAllocator.informChanged(tmpId);
              if (tmp2) valueAllocator.deallocateId(value2);
              return { type: 'non-literal', value: tmpId, tmp: true };
            }
          } else {
            if (outId != undefined) {
              const regOut = valueAllocator.ensureOnRegister(outId);
              valueAllocator.setValue(outId, value2);
              this.genRegLitMath(expr.operation, value1, regOut);
              valueAllocator.informChanged(outId);
              if (tmp2) valueAllocator.deallocateId(value2);
              return { type: 'non-literal', value: outId, tmp: false };
            } else {
              const tmpId = valueAllocator.getTmpId(nextTmpNum++);
              valueAllocator.setValue(tmpId, value2);
              const regTmp = valueAllocator.ensureOnRegister(tmpId);
              this.genRegLitMath(expr.operation, value1, regTmp);
              valueAllocator.informChanged(tmpId);
              if (tmp2) valueAllocator.deallocateId(value2);
              return { type: 'non-literal', value: tmpId, tmp: true };
            }
          }
        } else if (type1 === 'non-literal' && type2 === 'literal') {
          if (outId != undefined) {
            const regOut = valueAllocator.ensureOnRegister(outId);
            valueAllocator.setValue(outId, value1);
            this.genRegLitMath(expr.operation, value2, regOut);
            valueAllocator.informChanged(outId);
            if (tmp1) valueAllocator.deallocateId(value1);
            return { type: 'non-literal', value: outId, tmp: false };
          } else {
            const tmpId = valueAllocator.getTmpId(nextTmpNum++);
            valueAllocator.setValue(tmpId, value1);
            const regTmp = valueAllocator.ensureOnRegister(tmpId);
            this.genRegLitMath(expr.operation, value2, regTmp);
            valueAllocator.informChanged(tmpId);
            if (tmp1) valueAllocator.deallocateId(value1);
            return { type: 'non-literal', value: tmpId, tmp: true };
          }
        } else {
          if (outId != undefined) {
            const reg1 = valueAllocator.ensureOnRegister(value1);
            const reg2 = valueAllocator.ensureOnRegister(value2, [reg1]);
            const regOut = valueAllocator.ensureOnRegister(outId, [reg1, reg2]);
            this.genRegToRegMath(expr.operation, reg1, reg2, regOut);
            valueAllocator.informChanged(outId);
            if (tmp1) valueAllocator.deallocateId(value1);
            if (tmp2) valueAllocator.deallocateId(value2);
            if (tmpAux != undefined) valueAllocator.deallocateId(tmpAux);
            return { type: 'non-literal', value: outId, tmp: false };
          } else {
            const tmpId = valueAllocator.getTmpId(nextTmpNum++);
            const regTmp = valueAllocator.ensureOnRegister(tmpId);
            const reg1 = valueAllocator.ensureOnRegister(value1, [regTmp]);
            const reg2 = valueAllocator.ensureOnRegister(value2, [regTmp, reg1]);
            this.genRegToRegMath(expr.operation, reg1, reg2, regTmp);
            valueAllocator.informChanged(tmpId);
            if (tmp1) valueAllocator.deallocateId(value1);
            if (tmp2) valueAllocator.deallocateId(value2);
            if (tmpAux != undefined) valueAllocator.deallocateId(tmpAux);
            return { type: 'non-literal', value: tmpId!, tmp: true };
          }
        }
      } /*else if (expr instanceof RelationalExpression) {
        // generate code based on expr.operation
        if (!(expr.leftExpression instanceof LiteralExpression) && !(expr.rightExpression instanceof LiteralExpression)) {
          genExpression(expr.leftExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          genExpression(expr.rightExpression, srcId);
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegLessThanRegTest(dstReg, srcReg, dstReg);
          valueAllocator.deallocateId(srcId);
          valueAllocator.informChanged(id);
        } else if (!(expr.leftExpression instanceof LiteralExpression) && expr.rightExpression instanceof LiteralExpression) {
          genExpression(expr.leftExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          valueAllocator.setLiteral(srcId, expr.rightExpression.value);
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegLessThanRegTest(dstReg, srcReg, dstReg);
          valueAllocator.informChanged(id);
        } else if (expr.leftExpression instanceof LiteralExpression && !(expr.rightExpression instanceof LiteralExpression)) {
          genExpression(expr.rightExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          valueAllocator.setLiteral(srcId, expr.leftExpression.value);
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegLessThanRegTest(srcReg, dstReg, dstReg);
          valueAllocator.deallocateId(srcId);
          valueAllocator.informChanged(id);
        } else if (expr.leftExpression instanceof LiteralExpression && expr.rightExpression instanceof LiteralExpression) {
          valueAllocator.setLiteral(id, expr.leftExpression.value < expr.rightExpression.value ? 1 : 0);
        } else {
          throw new Error('Unsupported codegen expression evaluation');
        }
      }*/ else if (expr instanceof AssignExpression) {
        const dstVar = expr.varRef.varName;
        const dstId = valueAllocator.getVarId(dstVar);
        const {type, value, tmp} = genExpression(expr.expression, dstId);
        if (type === 'literal') {
          valueAllocator.setLiteral(dstId, value);
        }
        if (tmp) valueAllocator.deallocateId(value);
        return { type: 'literal', value: 0, tmp: false };
      } else if (expr instanceof CallExpression) {
        if (expr.paramExpressions.length !== 1)
          throw new Error('At this point, code gen doesnt support multiple params on call expression');
        const tmpId = valueAllocator.getTmpId(nextTmpNum++);
        const {type, value, tmp} = genExpression(expr.paramExpressions[0], tmpId);

        let tmpReg;
        if (type === 'literal') {
          valueAllocator.setLiteral(tmpId, value);
          tmpReg = valueAllocator.ensureOnRegister(tmpId);
        } else {
          tmpReg = valueAllocator.ensureOnRegister(value);
        }
        switch (expr.funcName) {
          case 'printc':
            this.genPrintChar(tmpReg);
            break;
          case 'printn':
            this.genPrintNumber(tmpReg);
            break;
          default:
            throw new Error('Function not found: ' + expr.funcName);
        }
        valueAllocator.deallocateId(tmpId);
        if (tmp) valueAllocator.deallocateId(value);
        return { type: 'literal', value: 0, tmp: false };
      } else if (expr instanceof NegateExpression) {
        if (expr.expression instanceof LiteralExpression) {
          return { type: 'literal', value: -expr.expression.value, tmp: false };
        } else {
          const {type, value} = genExpression(expr.expression, outId);
          if (type === 'literal') {
            return { type: 'literal', value: -value, tmp: false };
          } else {
            if (outId != undefined) {
              const reg = valueAllocator.ensureOnRegister(outId);
              this.genRegNegate(reg);
              return { type: 'non-literal', value: outId, tmp: false };
            } else {
              const tmpId = valueAllocator.getTmpId(nextTmpNum++);
              valueAllocator.setValue(tmpId, value);
              const reg = valueAllocator.ensureOnRegister(tmpId);
              this.genRegNegate(reg);
              return { type: 'non-literal', value: tmpId, tmp: true };
            }
          }
        }
      } else if (expr instanceof VarReference) {
        return { type: 'non-literal', value: valueAllocator.getVarId(expr.varName), tmp: false };
      } else if (expr instanceof LiteralExpression) {
        return { type: 'literal', value: expr.value, tmp: false };
      }
      throw new Error('Unsupported expression');
    };

    const genStatements = (statements: Statement[]) => {
      for (const statement of statements) {
        if (statement instanceof ExpressionStatement) {
          const { value, tmp } = genExpression(statement.expression);
          if (tmp) valueAllocator.deallocateId(value);
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

    this.genEnd();
  }
}
