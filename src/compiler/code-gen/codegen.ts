import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";
import { SSABlockArgument } from "../ssa-ir/blocks";
import { SSABinaryInstruction, SSABranchGoInstruction, SSABranchNZInstruction, SSACallInstruction, SSAInstruction, SSAMoveInstruction, SSARetInstruction, SSAUnaryInstruction } from "../ssa-ir/instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAValue, SSAVariable } from "../ssa-ir/values";

export class CodeGen implements ICodeGen {
  private code = '';
  private registerCount = 4;

  generate(astIr: Ast) {
    const ssaIr = new SSA(astIr);
    console.log('[SSA]');
    console.log(ssaIr.toString());
    const registerAllocator = new LinearScan();
    registerAllocator.process(ssaIr, {
      registerCount: this.registerCount,
    });
    console.log();
    console.log('[SSA Post Allocations]');
    console.log(ssaIr.toString());
    console.log();

    const tempRegs = new Array(this.registerCount).fill(0).map((_, i) => `r${i + 1}`);

    const ensureReg = (blackList: string[] = [], ...options: { variable: SSAVariable, load?: boolean, save?: boolean }[]) => {
      const regs: string[] = [];
      const disposeFns: (() => void)[] = [];
      for (let i = 0; i < options.length; i++) {
        const { variable } = options[i];
        if (variable.register !== undefined) {
          blackList.push(variable.register);
          regs[i] = variable.register;
        } else if (variable.stackPos === undefined) {
          return { regs: [], dispose: () => {}, unused: true };
        }
      }
      for (let i = 0; i < options.length; i++) {
        const { variable, load = true, save = true } = options[i];
        if (variable.stackPos !== undefined) {
          const fallbackRegIndex = tempRegs.findIndex(reg => !blackList.includes(reg));
          if (fallbackRegIndex < 0) throw new Error('Could not ensure variable into a register, tempRegs: ' + tempRegs + ', variable: ' + variable.toString() + ', blackList: ' + blackList.join(', '));
          const fallbackReg = tempRegs[fallbackRegIndex];
          tempRegs.splice(fallbackRegIndex, 1);
          this.code += `  push ${fallbackReg}\n`;
          if (load) {
            this.code += `  ldi r0, ${-variable.stackPos}\n`;
            this.code += `  add r0, r5, r0\n`;
            this.code += `  ldw ${fallbackReg}, r0\n`;
          }
          regs[i] = fallbackReg;
          disposeFns.unshift(() => {
            if (!tempRegs.includes(fallbackReg)) tempRegs.push(fallbackReg);
            if (save) {
              this.code += `  ldi r0, ${-variable.stackPos!}\n`;
              this.code += `  add r0, r5, r0\n`;
              this.code += `  stw ${fallbackReg}, r0\n`;
            }
            this.code += `  pop ${fallbackReg}\n`;
          });
        }
      }
      const dispose = () => disposeFns.forEach(fn => fn());
      return { regs, dispose };
    };

    const reconciliate = (inputArgs: SSAValue[], destArgs: SSABlockArgument[], instruction: SSAInstruction) => {
      const allocMapping = new Map<string | number, string | number>();
      for (let i = 0; i < inputArgs.length; i++) {
        const inputArg = inputArgs[i];
        const destArg = destArgs[i].variable;
        if (inputArg instanceof SSAVariable && destArg instanceof SSAVariable) {
          const input = inputArg.register !== undefined ? inputArg.register : inputArg.stackPos!;
          const dest = destArg.register !== undefined ? destArg.register : destArg.stackPos!;
          if (input !== dest) allocMapping.set(input, dest);
        }
      }
      while (allocMapping.size > 0) {
        const allocs: (string | number)[] = [];
        const start: string = allocMapping.keys().next().value;
        allocs.push(start);
        while (allocMapping.has(allocs[allocs.length - 1])) {
          const curAlloc = allocs[allocs.length - 1];
          const nextAlloc = allocMapping.get(curAlloc)!;
          allocs.push(nextAlloc);
          allocMapping.delete(curAlloc);
        }
        const isCycle = allocs[allocs.length - 1] === allocs[0];
        const firstAlloc = allocs[0];
        if (isCycle) {
          if (typeof firstAlloc === 'number') {
            this.code += `  ldi r0, ${-firstAlloc} // [arg-rec cycle-start] ${instruction.toString()}\n`;
            this.code += `  add r0, r5, r0 // [arg-rec cycle-start] ${instruction.toString()}\n`;
            this.code += `  ldw lr, r0 // [arg-rec cycle-start] ${instruction.toString()}\n`;
          } else {
            this.code += `  mov lr, ${firstAlloc} // [arg-rec cycle-start] ${instruction.toString()}\n`;
          }
        }
        for (let i = allocs.length - 2; i >= 0; i--) {
          const inputAlloc = i === 0 && isCycle ? 'lr' : allocs[i];
          const destAlloc = allocs[i + 1];
          if (typeof inputAlloc === 'number') {
            if (typeof destAlloc === 'number') {
              throw 'number to number failed';
              /*this.code += `  ldi r0, ${-inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, r5, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  ldw r0, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;*/
            } else {
              this.code += `  ldi r0, ${-inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, r5, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  ldw ${destAlloc}, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            }
          } else {
            if (typeof destAlloc === 'number') {
              this.code += `  ldi r0, ${-destAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, r5, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  stw ${inputAlloc}, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            } else {
              this.code += `  mov ${destAlloc}, ${inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            }
          }
        }
      }
      
      // load literals
      for (let i = 0; i < inputArgs.length; i++) {
        const inputArg = inputArgs[i];
        const destArg = destArgs[i].variable;
        if (inputArg instanceof SSALiteralNumberValue) {
          const { regs: [destReg], dispose } = ensureReg([], 
            { variable: destArg, load: false }
          );
          this.code += `  ldi ${destReg}, ${inputArg.value} // [arg-rec lit] ${instruction.toString()}\n`;
          dispose();
        } else if (inputArg instanceof SSALiteralStringValue) {
          throw new Error('Not implemented ' + instruction.toString());
        }
      }
    };

    // TODO: REFACTOR THIS!!!
    const reconciliateForCall = (inputArgs: SSAValue[], destArgs: SSABlockArgument[], instruction: SSAInstruction) => {
      const allocMapping = new Map<string | number, string | number>();
      for (let i = 0; i < inputArgs.length; i++) {
        const inputArg = inputArgs[i];
        const destArg = destArgs[i].variable;
        if (inputArg instanceof SSAVariable && destArg instanceof SSAVariable) {
          const input = inputArg.register !== undefined ? inputArg.register : inputArg.stackPos!;
          const dest = destArg.register !== undefined ? destArg.register : destArg.stackPos!;
          if (typeof dest === 'number' || input !== dest) allocMapping.set(input, dest);
        }
      }
      while (allocMapping.size > 0) {
        const allocs: (string | number)[] = [];
        const start: string = allocMapping.keys().next().value;
        allocs.push(start);
        while (allocMapping.has(allocs[allocs.length - 1])) {
          const curAlloc = allocs[allocs.length - 1];
          const nextAlloc = allocMapping.get(curAlloc)!;
          allocs.push(nextAlloc);
          allocMapping.delete(curAlloc);
        }
        const isCycle = allocs[allocs.length - 1] === allocs[0];
        const firstAlloc = allocs[0];
        if (isCycle) {
          if (typeof firstAlloc === 'number') {
            this.code += `  ldi r0, ${-firstAlloc} // [arg-rec cycle-start] ${instruction.toString()}\n`;
            this.code += `  add r0, sr, r0 // [arg-rec cycle-start] ${instruction.toString()}\n`;
            this.code += `  ldw lr, r0 // [arg-rec cycle-start] ${instruction.toString()}\n`;
          } else {
            this.code += `  mov lr, ${firstAlloc} // [arg-rec cycle-start] ${instruction.toString()}\n`;
          }
        }
        for (let i = allocs.length - 2; i >= 0; i--) {
          const inputAlloc = i === 0 && isCycle ? 'lr' : allocs[i];
          const destAlloc = allocs[i + 1];
          if (typeof inputAlloc === 'number') {
            if (typeof destAlloc === 'number') {
              throw 'number to number failed';
              /*this.code += `  ldi r0, ${-inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, ${reg}, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  ldw r0, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;*/
            } else {
              this.code += `  ldi r0, ${-inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, sr, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  ldw ${destAlloc}, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            }
          } else {
            if (typeof destAlloc === 'number') {
              this.code += `  ldi r0, ${-(destAlloc + 6)} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  add r0, sp, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
              this.code += `  stw ${inputAlloc}, r0 // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            } else {
              this.code += `  mov ${destAlloc}, ${inputAlloc} // [arg-rec cycle-middle] ${instruction.toString()}\n`;
            }
          }
        }
      }
      
      // load literals
      for (let i = 0; i < inputArgs.length; i++) {
        const inputArg = inputArgs[i];
        const destArg = destArgs[i].variable;
        if (inputArg instanceof SSALiteralNumberValue) {
          const { regs: [destReg], dispose } = ensureReg([], 
            { variable: destArg, load: false }
          );
          this.code += `  ldi ${destReg}, ${inputArg.value} // [arg-rec lit] ${instruction.toString()}\n`;
          dispose();
        } else if (inputArg instanceof SSALiteralStringValue) {
          throw new Error('Not implemented ' + instruction.toString());
        }
      }
    };

    const calcStackSize = (functionId: string) => {
      let stackSize = 0;
      const blocks = ssaIr.blocksPerFunction.get(functionId)!;
      for (const block of blocks) {
        for (const variable of block.variables) {
          if (variable.stackPos !== undefined) {
            stackSize = Math.max(stackSize, variable.stackPos + 2);
          }
        }
      }
      return stackSize;
    }

    this.code += `bnz r7, ${ssaIr.blocksPerFunction.get('main')![0].id}\n`;
    for (const [functionId, blocks] of ssaIr.blocksPerFunction) {
      const stackSize = calcStackSize(functionId);

      this.code += `${blocks[0].id}\n`;
      const retBlockName = `${functionId}_ret`;
      let locationSeq = 0;
      this.code += `  push lr\n`;
      this.code += `  push sr\n`;
      this.code += `  mov sr, sp\n`;
      this.code += `  sub sp, ${stackSize}\n`;
      this.code += `  sub sr, 2\n`;

      for (const block of blocks) {
        if (block.seq > 0) {
          this.code += `${block.id}\n`;
        }
        for (const instruction of block.instructions) {
          if (instruction instanceof SSAMoveInstruction) {
            if (instruction.input instanceof SSALiteralNumberValue) {
              const { regs: [destReg], dispose, unused } = ensureReg([], { variable: instruction.dest, load: false });
              if (!unused) {
                this.code += `  ldi ${destReg}, ${instruction.input.toString()} // ${instruction.toString()}\n`;
              }
              dispose();
            } else if (instruction.input instanceof SSAVariable) {
              const { regs: [destReg, inputReg], dispose, unused } = ensureReg([], 
                { variable: instruction.dest, load: false },
                { variable: instruction.input }
              );
              if (!unused) {
                this.code += `  mov ${destReg}, ${inputReg} // ${instruction.toString()}\n`;
              }
              dispose();
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSABinaryInstruction) {
            switch(instruction.operation) {
              case '+':
              case '-':
              case '<':
              case '>':
                const [opName, opFn, dest, left, right] = ({
                  '+': ['add', (x: number, y: number) => x + y, instruction.dest, instruction.left, instruction.right],
                  '-': ['sub', (x: number, y: number) => x - y, instruction.dest, instruction.left, instruction.right],
                  '<': ['slt', (x: number, y: number) => x < y ? 1 : 0, instruction.dest, instruction.left, instruction.right],
                  '>': ['slt', (x: number, y: number) => x > y ? 1 : 0, instruction.dest, instruction.right, instruction.left],
                } as const)[instruction.operation];
                if (dest instanceof SSAVariable && left instanceof SSAVariable && right instanceof SSAVariable) {
                  const { regs: [destReg, leftReg, rightReg], dispose, unused } = ensureReg([], 
                    { variable: dest, load: false },
                    { variable: left },
                    { variable: right },
                  );
                  if (!unused) {
                    this.code += `  ${opName} ${destReg}, ${leftReg}, ${rightReg} // ${instruction.toString()}\n`;
                  }
                  dispose();
                } else if (dest instanceof SSAVariable && left instanceof SSAVariable && right instanceof SSALiteralNumberValue) {
                  const { regs: [destReg, leftReg], dispose, unused } = ensureReg([], 
                    { variable: dest, load: false },
                    { variable: left }
                  );
                  if (!unused) {
                    this.code += `  ldi r0, ${right.value} // ${instruction.toString()}\n`;
                    this.code += `  ${opName} ${destReg}, ${leftReg}, r0 // ${instruction.toString()}\n`;
                  }
                  dispose();
                } else if (dest instanceof SSAVariable && right instanceof SSAVariable && left instanceof SSALiteralNumberValue) {
                  const { regs: [destReg, rightReg], dispose, unused } = ensureReg([], 
                    { variable: dest, load: false },
                    { variable: right }
                  );
                  if (!unused) {
                    this.code += `  ldi r0, ${left.value} // ${instruction.toString()}\n`;
                    this.code += `  ${opName} ${destReg}, r0, ${rightReg} // ${instruction.toString()}\n`;
                  }
                  dispose();
                } else if (dest instanceof SSAVariable && left instanceof SSALiteralNumberValue && right instanceof SSALiteralNumberValue) {
                  const { regs: [destReg], dispose, unused } = ensureReg([], 
                    { variable: dest, load: false }
                  );
                  if (!unused) {
                    this.code += `  ldi ${destReg}, ${opFn(left.value, right.value)} // ${instruction.toString()}\n`;
                  }
                  dispose();
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
                break;
              default:
                throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSABranchNZInstruction) {
            const { regs: [inputReg], dispose } = ensureReg([], 
              { variable: instruction.input, save: false }
            );
            const destFalseBlockName = `${block.name}_nz_df_${locationSeq++}`;
            this.code += `  bez ${inputReg}, ${destFalseBlockName} // ${instruction.toString()}\n`;
            dispose();
            reconciliate(instruction.paramsTrue, instruction.destTrue.args, instruction);
            this.code += `  bnz r7, ${instruction.destTrue.id} // ${instruction.toString()}\n`;
            this.code += `${destFalseBlockName}\n`;
            dispose();
            reconciliate(instruction.paramsFalse, instruction.destFalse.args, instruction);
            this.code += `  bnz r7, ${instruction.destFalse.id} // ${instruction.toString()}\n`;
          } else if (instruction instanceof SSABranchGoInstruction) {
            reconciliate(instruction.params, instruction.dest.args, instruction);
            this.code += `  bnz r7, ${instruction.dest.id} // ${instruction.toString()}\n`;
          } else if (instruction instanceof SSARetInstruction) {
            if (instruction.retVar instanceof SSALiteralNumberValue) {
              throw new Error('Not implemented ' + instruction.toString());
            } else if (instruction.retVar instanceof SSALiteralStringValue) {
              throw new Error('Not implemented ' + instruction.toString());
            } else if (instruction.retVar instanceof SSAVariable) {
              const { regs: [retReg], dispose } = ensureReg(['r1'], 
                { variable: instruction.retVar, save: false }
              );
              this.code += `  mov r1, ${retReg} // ${instruction.toString()}\n`;
              dispose();
              this.code += `  bnz r7, ${retBlockName} // ${instruction.toString()}\n`;
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSACallInstruction) {
            if (instruction.func.args.length !== instruction.args.length) throw new Error('Wrong args count ' + instruction.toString());
            if (instruction.dest.register !== undefined) {
              for (let i = 0; i < this.registerCount; i++) {
                const register = `r${i + 1}`;
                if (instruction.dest.register !== register) {
                  this.code += `  push ${register} // ${instruction.toString()}\n`;
                }
              }
            } else if (instruction.dest.stackPos !== undefined) {
              for (let i = 0; i < this.registerCount; i++) {
                const register = `r${i + 1}`;
                this.code += `  push ${register} // ${instruction.toString()}\n`;
              }
            }

            const postCallBlockName = `${block.name}_post_call_${locationSeq++}`;

            reconciliateForCall(instruction.args, instruction.func.args, instruction);

            this.code += `  ldi lr, ${postCallBlockName} // ${instruction.toString()}\n`;
            this.code += `  bnz r7, ${instruction.func.id} // ${instruction.toString()}\n`;
            this.code += `${postCallBlockName} // ${instruction.toString()}\n`;

            if (instruction.dest.register !== undefined) {
              this.code += `  mov ${instruction.dest.register}, r1 // ${instruction.toString()}\n`;
              for (let i = this.registerCount - 1; i >= 0; i--) {
                const register = `r${i + 1}`;
                if (instruction.dest.register !== register) {
                  this.code += `  pop ${register} // ${instruction.toString()}\n`;
                }
              }
            } else if (instruction.dest.stackPos !== undefined) {
              const { regs: [destReg], dispose } = ensureReg(['r1'], 
                { variable: instruction.dest, load: false }
              );
              this.code += `  mov ${destReg}, r1 // ${instruction.toString()}\n`;
              dispose();
              for (let i = this.registerCount - 1; i >= 0; i--) {
                const register = `r${i + 1}`;
                this.code += `  pop ${register} // ${instruction.toString()}\n`;
              }
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else {
            throw new Error('Not implemented ' + instruction.toString());
          }
        }
      }
      this.code += `${retBlockName}\n`;
      if (functionId !== 'main') {
        this.code += `  add sp, ${stackSize}\n`;
        this.code += `  pop sr\n`;
        this.code += `  pop lr\n`;
        this.code += `  bnz r7, lr\n`;
      } else {
        this.code += `  stw r1, console_writei\n`;
        this.code += `  hcf\n`;
      }
    }
    return this.code;
  }
}
