import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";
import { SSABinaryInstruction, SSABranchGoInstruction, SSABranchNZInstruction, SSACallInstruction, SSAMoveInstruction, SSARetInstruction, SSAUnaryInstruction } from "../ssa-ir/instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAVariable } from "../ssa-ir/values";

export class GoodCodeGen implements ICodeGen {
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
    this.code += `bnz r7, ${ssaIr.blocksPerFunction.get('main')![0].id}\n`;
    for (const [functionId, blocks] of ssaIr.blocksPerFunction) {
      this.code += `${blocks[0].id}\n`;
      const retBlockName = `${functionId}_ret`;
      let postCallBlockSeq = 0;
      if (functionId !== 'main') {
        this.code += `  push lr\n`;
        this.code += `  push sr\n`;
        this.code += `  mov sr, sp\n`;
      }
      for (const block of blocks) {
        if (block.seq > 0) {
          this.code += `${block.id}\n`;
        }
        for (const instruction of block.instructions) {
          if (instruction instanceof SSAMoveInstruction) {
            if (instruction.dest.register !== undefined) {
              const destReg = instruction.dest.register;
              if (instruction.input instanceof SSALiteralNumberValue) {
                this.code += `  ldi ${destReg}, ${instruction.input.toString()}\n`;
              } else if (instruction.input instanceof SSAVariable) {
                if (instruction.input.register !== undefined) {
                  const inputReg = instruction.input.register;
                  this.code += `  mov ${destReg}, ${inputReg}\n`;
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
              } else {
                throw new Error('Not implemented ' + instruction.toString());
              }
            } else if (instruction.dest.stackPos !== undefined) {
              throw new Error('Not implemented ' + instruction.toString());
            } else {
              // Unused variable, the linear scan doesn't allocated anything to this
            }
          } else if (instruction instanceof SSABinaryInstruction) {
            switch(instruction.operation) {
              case '+':
                if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSAVariable) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined && instruction.right.register !== undefined) {
                    this.code += `  add ${instruction.dest.register}, ${instruction.left.register}, ${instruction.right.register}\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSALiteralNumberValue) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined) {
                    this.code += `  ldi r0, ${instruction.right.value}\n`;
                    this.code += `  add ${instruction.dest.register}, ${instruction.left.register}, r0\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSALiteralNumberValue && instruction.right instanceof SSALiteralNumberValue) {
                  if (instruction.dest.register !== undefined) {
                    this.code += `  ldi ${instruction.dest.register}, ${instruction.left.value + instruction.right.value}\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
                break;
              case '>':
                if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSALiteralNumberValue) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined) {
                    this.code += `  ldi r0, ${instruction.right.value}\n`;
                    this.code += `  slt ${instruction.dest.register}, r0, ${instruction.left.register}\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
                break;
              case '<':
                if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSALiteralNumberValue) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined) {
                    this.code += `  ldi r0, ${instruction.right.value}\n`;
                    this.code += `  slt ${instruction.dest.register}, ${instruction.left.register}, r0\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSAVariable) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined && instruction.right.register !== undefined) {
                    this.code += `  slt ${instruction.dest.register}, ${instruction.left.register}, ${instruction.right.register}\n`;
                  } else {
                    throw new Error('Not implemented ' + instruction.toString());
                  }
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
                break;
              default:
                throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSABranchNZInstruction) {
            if (instruction.input.register !== undefined) {
              this.code += `  bnz ${instruction.input.register}, ${instruction.destTrue.id}\n`;
              this.code += `  bnz r7, ${instruction.destFalse.id}\n`;
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSABranchGoInstruction) {
            this.code += `  bnz r7, ${instruction.dest.id}\n`;
          } else if (instruction instanceof SSARetInstruction) {
            if (instruction.retVar instanceof SSALiteralNumberValue) {
              throw new Error('Not implemented ' + instruction.toString());
            } else if (instruction.retVar instanceof SSALiteralStringValue) {
              throw new Error('Not implemented ' + instruction.toString());
            } else if (instruction.retVar instanceof SSAVariable) {
              if (instruction.retVar.register !== undefined) {
                const destReg = instruction.retVar.register;
                if (destReg != 'r1') {
                  this.code += `  mov r1, ${destReg}\n`;
                }
                this.code += `  bnz r7, ${retBlockName}\n`;
              } else {
                throw new Error('Not implemented ' + instruction.toString());
              }
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else if (instruction instanceof SSACallInstruction) {
            if (instruction.func.args.length !== instruction.args.length) throw new Error('Wrong args count ' + instruction.toString());
            if (instruction.dest.register !== undefined) {
              for (let i = 0; i < this.registerCount; i++) {
                const register = `r${i + 1}`;
                if (instruction.dest.register !== register) {
                  this.code += `  push ${register}\n`;
                }
              }
            }


            // ARG RECONCILIATION START
            for (let i = 0; i < instruction.args.length; i++) {
              const inputArg = instruction.args[i];
              const destArg = instruction.func.args[i].variable;
              if (inputArg instanceof SSALiteralNumberValue) {
                if (destArg.register !== undefined) {
                  this.code += `  ldi ${destArg.register}, ${inputArg.value}\n`;
                } else {
                  throw new Error('Not implemented ' + instruction.toString());
                }
              } else if (inputArg instanceof SSALiteralStringValue) {
                throw new Error('Not implemented ' + instruction.toString());
              }
            }
            const registerMapping = new Map<string, string>();
            for (let i = 0; i < instruction.args.length; i++) {
              const inputArg = instruction.args[i];
              const destArg = instruction.func.args[i].variable;
              if (inputArg instanceof SSAVariable && inputArg.register !== undefined) {
                if (destArg instanceof SSAVariable && destArg.register !== undefined) {
                  if (inputArg.register !== destArg.register) {
                    registerMapping.set(inputArg.register, destArg.register);
                  }
                }
              }
            }
            if (registerMapping.size > 0) {
              console.log('registerMapping', registerMapping);
              throw new Error('Not implemented ' + instruction.toString());
            }
            // ARG RECONCILIATION END

            const postCallBlockName = `${block.name}_post_call_${postCallBlockSeq++}`;
            this.code += `  ldi lr, ${postCallBlockName}\n`;
            this.code += `  bnz r7, ${instruction.func.id}\n`;
            this.code += `${postCallBlockName}\n`;
            if (instruction.dest.register !== undefined) {
              this.code += `  mov ${instruction.dest.register}, r1\n`;
              for (let i = this.registerCount - 1; i >= 0; i--) {
                const register = `r${i + 1}`;
                if (instruction.dest.register !== register) {
                  this.code += `  pop ${register}\n`;
                }
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
        this.code += `  mov sp, sr\n`;
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
