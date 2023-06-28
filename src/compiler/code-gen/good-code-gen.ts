import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";
import { SSABinaryInstruction, SSAMoveInstruction, SSARetInstruction } from "../ssa-ir/instructions";
import { SSALiteralNumberValue, SSAVariable } from "../ssa-ir/values";

export class GoodCodeGen implements ICodeGen {
  generate(astIr: Ast) {
    const ssaIr = new SSA(astIr);
    const registerAllocator = new LinearScan();
    registerAllocator.process(ssaIr, {
      registerCount: 4,
    });

    let code = '';
    for (const [block, allocations] of registerAllocator.ssaBlockAllocations) {
      code += `${block.id}\n`;
      for (const instruction of block.instructions) {
        if (instruction instanceof SSAMoveInstruction) {
          const destAllocation = allocations.get(instruction.dest.toString())!;
          if (destAllocation) {
            if (destAllocation.type === 'register') {
              const destReg = destAllocation.register;
              if (instruction.input instanceof SSALiteralNumberValue) {
                code += `  ldi ${destReg}, ${instruction.input.toString()}\n`;
              } else if (instruction.input instanceof SSAVariable) {
                const inputAllocation = allocations.get(instruction.input.toString())!;
                if (inputAllocation.type === 'register') {
                  const inputReg = inputAllocation.register;
                  code += `  mov ${destReg}, ${inputReg}\n`;
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
        } else if (instruction instanceof SSABinaryInstruction) {
          switch(instruction.operation) {
            case '+':
              /*if (instruction.dest)
              if (instruction.left instanceof SSALiteralNumberValue) {
                if (instruction.right instanceof SSALiteralNumberValue) {

                }
              }
              const leftAllocation = allocations.get(instruction.left.toString())!;
              const rightAllocation = allocations.get(instruction.right.toString())!;
              if (leftAllocation.type === 'register' && rightAllocation.type === 'register' && destAllocation.type === 'register') {
                code += `  add ${destAllocation.register} ${leftAllocation.register} ${rightAllocation}`;
              } */
              break;
            default:
              throw new Error('Not implemented ' + instruction.toString());
          }
        } else if (instruction instanceof SSARetInstruction) {
          const retAllocation = allocations.get(instruction.retVar.toString())!;
          if (retAllocation.type === 'register') {
            const destReg = retAllocation.register;
            code += `  stw ${destReg}, console_writei\n`;
          } else {
            throw new Error('Not implemented ' + instruction.toString());
          }
        } else {
          throw new Error('Not implemented ' + instruction.toString());
        }
      }
    }
    code += `hcf\n`;
    console.log(code);
    //console.log('allocations', inspect([...registerAllocator.ssaBlockAllocations.entries()].map(([k, v]) => [k.toString(), v]), false, null));
    return code;
  }
}
