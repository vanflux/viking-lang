import { ICodeGen } from ".";
import { Ast } from "../ast-ir";

export class DumbCodeGen implements ICodeGen {
  generate(astIr: Ast) {
    return [
      'ldi r1, 0x41',
      'stw r1, console_writec',
      'hcf',
    ].join('\n');
  }
}
