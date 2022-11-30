import { ICodeGen } from ".";
import { Ast } from "../ast-ir";
import { LinearScan } from "../register-allocator";
import { SSA } from "../ssa-ir";

export class GoodCodeGen implements ICodeGen {
  generate(astIr: Ast) {
    const ssaIr = new SSA(astIr);
    const registerAllocator = new LinearScan();
    registerAllocator.process(ssaIr, {
      registerCount: 4,
    });
    
    return '';
  }
}
