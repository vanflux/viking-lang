import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";
import { SSABinaryInstruction, SSABranchGoInstruction, SSABranchNZInstruction, SSACallInstruction, SSAMoveInstruction, SSARetInstruction, SSAUnaryInstruction } from "../ssa-ir/instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAVariable } from "../ssa-ir/values";

export class GoodCodeGen implements ICodeGen {
  private code = '';

  generate(astIr: Ast) {
    const ssaIr = new SSA(astIr);
    console.log('[SSA]');
    console.log(ssaIr.toString());
    const registerAllocator = new LinearScan();
    registerAllocator.process(ssaIr, {
      registerCount: 4,
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
              case '<':
                if (instruction.dest instanceof SSAVariable && instruction.left instanceof SSAVariable && instruction.right instanceof SSALiteralNumberValue) {
                  if (instruction.dest.register !== undefined && instruction.left.register !== undefined) {
                    this.code += `  ldi r0, ${instruction.right.value}\n`;
                    this.code += `  slt ${instruction.dest.register}, ${instruction.left.register}, r0\n`;
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
            if (instruction.args.length) {
              console.log(instruction.args);
            }
            const postCallBlockName = `${block.name}_post_call_${postCallBlockSeq++}`;
            this.code += `  ldi lr, ${postCallBlockName}\n`;
            this.code += `  bnz r7, ${instruction.func.id}\n`;
            this.code += `${postCallBlockName}\n`;
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
