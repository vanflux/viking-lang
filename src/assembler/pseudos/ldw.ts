import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Ldw implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationLdw = OperationsManager.getOperationByName('ldw');
    const operationLdi = OperationsManager.getOperationByName('ldi');
    if (instruction.getOperation().getName() !== operationLdw.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    if (operands[0].getType() === 'register') {
      switch (operands[1].getType()) {
        case 'register':
          // ldw r1, r2 -> [ ldw r1, r0, r2 ]
          return [new Instruction(operationLdw, [operands[0], new Operand('r0', Operand.REGISTER), operands[1]])];
        case 'symbol':
        case 'literal':
          // ldw r1, lit -> [ ldi at, lit   ldb r1, r0, at ]
          return [
            new Instruction(operationLdi, [new Operand('at', Operand.REGISTER), operands[1]]),
            new Instruction(operationLdw, [operands[0], new Operand('r0', Operand.REGISTER), new Operand('at', Operand.REGISTER)]),
          ];
        default:
      }
    }
    return [];
  }
}
