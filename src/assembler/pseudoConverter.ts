import { Architecture } from '../common';
import { Instruction } from '../common';

export interface Pseudo {
  convert(instruction: Instruction, architecture: Architecture): Instruction[];
}

export class PseudoConverter {
  private pseudos: Pseudo[];

  constructor(pseudos: Pseudo[]) {
    this.pseudos = pseudos;
  }

  convert(instruction: Instruction, architecture: Architecture) {
    for (let pseudo of this.pseudos) {
      let instructions = pseudo.convert(instruction, architecture);
      if (instructions.length > 0) {
        for (let i = 0; i < instructions.length; i++) {
          let convInstruction = instructions[i];
          let convInstructions = this.convert(convInstruction, architecture);

          if (convInstructions.length > 0) {
            instructions.splice(i, 1, ...convInstructions);
          }
        }
        return instructions;
      }
    }
    return [];
  }
}
