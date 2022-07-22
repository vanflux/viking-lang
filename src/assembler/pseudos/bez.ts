import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Bez implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationBez = OperationsManager.getOperationByName('bez');
    const operationLdi = OperationsManager.getOperationByName('ldi');
    if (instruction.getOperation().getName() !== operationBez.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    if (operands[0].getType() === 'register') {
      switch (operands[1].getType()) {
        case 'register':
          // bez r1, r2 -> [ bez r0, r1, r2 ]
          return [new Instruction(operationBez, [new Operand('r0', Operand.REGISTER), operands[0], operands[1]])];
        case 'symbol':
          // bez r1, sym -> [ ldi at, sym   bez r0, r1, at ]
          return [
            new Instruction(operationLdi, [new Operand('at', Operand.REGISTER), operands[1]]),
            new Instruction(operationBez, [new Operand('r0', Operand.REGISTER), operands[0], new Operand('at', Operand.REGISTER)]),
          ];
        default:
      }
    }
    return [];
  }
}
