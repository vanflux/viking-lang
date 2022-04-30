import { AssignExpression, Ast, Expression, LiteralExpression, SubExpression, MathExpression, VarReference, IfStatement, TestExpression, Statement } from "./ast";

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
      this.code.push('mov r5, r6');         // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`);    // Adjust TEMPORARY POINTER
      this.code.push(`ldw ${destReg}, r5`); // Load stack value to destReg
    }
  }

  genRegToStackMov(wpos: number, reg: string) {
    if (wpos == 0) {
      this.code.push(`stw ${reg}, r6`);     // Save srcReg value on stack
    } else {
      this.code.push('mov r5, r6');         // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`);    // Adjust TEMPORARY POINTER
      this.code.push(`stw ${reg}, r5`);     // Save srcReg value on stack
    }
  }

  genLitToRegMov(literal: number, reg: string) {
    this.code.push(`ldi ${reg}, ${literal}`);
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

  genJmpIfRegIsNotZero(reg: string, symbol: string) {
    this.code.push(`bnz ${reg}, ${symbol}`);
  }

  genJmp(reg: string, symbol: string) {
    this.code.push(`bnz r7, ${symbol}`);
  }

  genSymbol(symbolName: string) {
    this.code.push(`${symbolName}`);
  }

  genComment(comment: string) {
    this.code.push(`// ${comment}`);
  }

  constructor(ast: Ast) {
    this.genInit();
    const self = this;

    type AllocableValue = ({
      type: 'tmp',
      num: number;
    } | {
      type: 'var';
      varName: string;
    }) & {
      id: number,
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
        while(this.usedStackPoses.has(stackPos)) stackPos += 2;
        this.usedStackPoses.add(stackPos);
        allocable.stackPos = stackPos;
        return stackPos;
      }

      private freeRegister() {
        if (this.availableRegisters.length > 0) return this.availableRegisters.shift()!;
        const oldAllocable = this.allocables.find(x => x.register);
        if (!oldAllocable) throw new Error('Compiler tried to allocate too many registers');
        const register = oldAllocable.register!;
        if (oldAllocable.changed) {
          const stackPos = oldAllocable.stackPos != undefined ? oldAllocable.stackPos : this.allocStackPos(oldAllocable);
          self.genRegToStackMov(stackPos, register);
        }
        oldAllocable.register = undefined;
        return register;
      }

      private loadOnRegister(id: number, loadFromStack=true) {
        const allocable = this.getAllocable(id);
        const register = this.freeRegister();
        if (allocable.stackPos != undefined && loadFromStack) {
          self.genStackToRegMov(allocable.stackPos, register);
        }
        allocable.register = register;
        return register;
      }

      ensureOnRegister(id: number) {
        const allocable = this.getAllocable(id);
        if (allocable.register) return allocable.register;
        return this.loadOnRegister(id, true);
      }

      setLiteral(id: number, literal: number) {
        const allocable = this.getAllocable(id);
        if (allocable.register) {
          self.genLitToRegMov(literal, allocable.register);
        } else {
          const register = this.loadOnRegister(id, false);
          self.genLitToRegMov(literal, register);
          allocable.changed = true;
        }
      }

      setValue(dstId: number, srcId: number) {
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

    const genExpression = (expr: Expression, id: number) => {
      if (expr instanceof MathExpression) {
        if (
          (expr.leftExpression instanceof MathExpression || expr.leftExpression instanceof VarReference)
          && (expr.rightExpression instanceof MathExpression || expr.rightExpression instanceof VarReference)
        ) {
          //this.genComment('Evaluating math/var + math/var start');
          genExpression(expr.leftExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          genExpression(expr.rightExpression, srcId);
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegToRegMath(expr.operation, dstReg, srcReg, dstReg);
          valueAllocator.deallocateId(srcId);
          valueAllocator.informChanged(id);
          //this.genComment('Evaluated math/var + math/var end');
        } else if (
          (expr.leftExpression instanceof MathExpression || expr.leftExpression instanceof VarReference)
          && expr.rightExpression instanceof LiteralExpression
        ) {
          //this.genComment('Evaluating math/var ' + expr.operation + ' ' + expr.rightExpression.value + ' math/var start');
          genExpression(expr.leftExpression, id);
          const dstReg = valueAllocator.ensureOnRegister(id);
          this.genRegLitMath(expr.operation, expr.rightExpression.value, dstReg);
          valueAllocator.informChanged(id);
          //this.genComment('Evaluated math/var ' + expr.operation + ' ' + expr.rightExpression.value + ' math/var end');
        } else if (
          expr.leftExpression instanceof LiteralExpression
          && (expr.rightExpression instanceof MathExpression || expr.rightExpression instanceof VarReference)
        ) {
          //this.genComment('Evaluating ' + expr.leftExpression.value + ' ' + expr.operation + ' math/var start');
          genExpression(expr.rightExpression, id);
          if (expr.operation === '-') {
            const srcId = valueAllocator.getTmpId(nextTmpNum++);
            valueAllocator.setLiteral(srcId, expr.leftExpression.value)
            const dstReg = valueAllocator.ensureOnRegister(id);
            const srcReg = valueAllocator.ensureOnRegister(srcId);
            this.genRegToRegMath(expr.operation, srcReg, dstReg, dstReg);
            valueAllocator.deallocateId(srcId);
          } else {
            const dstReg = valueAllocator.ensureOnRegister(id);
            this.genRegLitMath(expr.operation, expr.leftExpression.value, dstReg);
          }
          valueAllocator.informChanged(id);
          //this.genComment('Evaluated ' + expr.leftExpression.value + ' ' + expr.operation + ' math/var end');
        } else if (expr.leftExpression instanceof LiteralExpression && expr.rightExpression instanceof LiteralExpression) {
          //this.genComment('Evaluating ' + expr.leftExpression.value + ' ' + expr.operation + ' ' + expr.rightExpression.value);
          if (expr.operation === '+') {
            valueAllocator.setLiteral(id, expr.leftExpression.value + expr.rightExpression.value);
          } else if (expr.operation === '-') {
            valueAllocator.setLiteral(id, expr.leftExpression.value - expr.rightExpression.value);
          } else {
            throw new Error('Unsupported literal literal expression evaluation');
          }
        } else {
          throw new Error('Unsupported codegen expression evaluation');
        }
      } else if (expr instanceof TestExpression) {



        if (
          (expr.leftExpression instanceof MathExpression || expr.leftExpression instanceof VarReference)
          && (expr.rightExpression instanceof MathExpression || expr.rightExpression instanceof VarReference)
        ) {
          genExpression(expr.leftExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          genExpression(expr.rightExpression, srcId);
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegLessThanRegTest(dstReg, srcReg, dstReg);
          valueAllocator.deallocateId(srcId);
          valueAllocator.informChanged(id);
        } else if (
          (expr.leftExpression instanceof MathExpression || expr.leftExpression instanceof VarReference)
          && expr.rightExpression instanceof LiteralExpression
        ) {
          genExpression(expr.leftExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          valueAllocator.setLiteral(srcId, expr.rightExpression.value)
          const dstReg = valueAllocator.ensureOnRegister(id);
          const srcReg = valueAllocator.ensureOnRegister(srcId);
          this.genRegLessThanRegTest(dstReg, srcReg, dstReg);
          valueAllocator.informChanged(id);
        } else if (
          expr.leftExpression instanceof LiteralExpression
          && (expr.rightExpression instanceof MathExpression || expr.rightExpression instanceof VarReference)
        ) {
          genExpression(expr.rightExpression, id);
          const srcId = valueAllocator.getTmpId(nextTmpNum++);
          valueAllocator.setLiteral(srcId, expr.leftExpression.value)
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



      } else if (expr instanceof VarReference) {
        const srcId = valueAllocator.getVarId(expr.varName);
        valueAllocator.setValue(id, srcId);
      } else if (expr instanceof LiteralExpression) {
        valueAllocator.setLiteral(id, expr.value);
      }
    }

    const genStatements = (statements: Statement[]) => {
      for (const statement of statements) {
        if (statement instanceof AssignExpression) {
          const expr = statement.expression;
          const dstVar = statement.varRef.varName;
          const dstId = valueAllocator.getVarId(dstVar);
          genExpression(expr, dstId);
        } else if (statement instanceof IfStatement) {
          const ifNum = nextIfNum++;
          const tmpId = valueAllocator.getTmpId(nextTmpNum++);
          genExpression(statement.conditionExpression, tmpId);
          const tmpReg = valueAllocator.ensureOnRegister(tmpId);
          valueAllocator.deallocateId(tmpId);
          this.genJmpIfRegIsNotZero(tmpReg, `if_${ifNum}`);
          if (statement.elseStatements) {
            this.genSymbol(`else_${ifNum}`);
            genStatements(statement.elseStatements);
            this.genJmp(tmpReg, `if_end_${ifNum}`);
          }
          if (statement.ifStatements) {
            this.genSymbol(`if_${ifNum}`);
            genStatements(statement.ifStatements);
          }
          this.genSymbol(`if_end_${ifNum}`);
        }
      }
    };

    genStatements(ast.statements);

    console.log(valueAllocator);

    this.genEnd();
  }
}
