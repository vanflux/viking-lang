import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";
import { SSABinaryInstruction, SSAMoveInstruction, SSARetInstruction } from "../ssa-ir/instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAVariable } from "../ssa-ir/values";

export class GoodCodeGen implements ICodeGen {
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
    let code = '';
    for (const block of ssaIr.blocks) {
      code += `${block.id}\n`;
      for (const instruction of block.instructions) {
        if (instruction instanceof SSAMoveInstruction) {
          if (instruction.dest.register !== undefined) {
            const destReg = instruction.dest.register;
            if (instruction.input instanceof SSALiteralNumberValue) {
              code += `  ldi ${destReg}, ${instruction.input.toString()}\n`;
            } else if (instruction.input instanceof SSAVariable) {
              if (instruction.input.register !== undefined) {
                const inputReg = instruction.input.register;
                code += `  mov ${destReg}, ${inputReg}\n`;
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
            // case '+':
            //   if (instruction.dest)
            //   if (instruction.left instanceof SSALiteralNumberValue) {
            //     if (instruction.right instanceof SSALiteralNumberValue) {

            //     }
            //   }
            //   const leftAllocation = allocations.get(instruction.left.toString())!;
            //   const rightAllocation = allocations.get(instruction.right.toString())!;
            //   if (leftAllocation.type === 'register' && rightAllocation.type === 'register' && destAllocation.type === 'register') {
            //     code += `  add ${destAllocation.register} ${leftAllocation.register} ${rightAllocation}`;
            //   }
            //   break;
            default:
              throw new Error('Not implemented ' + instruction.toString());
          }
        } else if (instruction instanceof SSARetInstruction) {
          if (instruction.retVar instanceof SSALiteralNumberValue) {
            throw new Error('Not implemented ' + instruction.toString());
          } else if (instruction.retVar instanceof SSALiteralStringValue) {
            throw new Error('Not implemented ' + instruction.toString());
          } else if (instruction.retVar instanceof SSAVariable) {
            if (instruction.retVar.register !== undefined) {
              const destReg = instruction.retVar.register;
              code += `  stw ${destReg}, console_writei\n`;
            } else {
              throw new Error('Not implemented ' + instruction.toString());
            }
          } else {
            throw new Error('Not implemented ' + instruction.toString());
          }
        } else {
          throw new Error('Not implemented ' + instruction.toString());
        }
      }
    }
    code += `hcf\n`;
    return code;
  }
}
