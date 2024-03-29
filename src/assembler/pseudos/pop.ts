import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Pop implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationPop = OperationsManager.getOperationByName('pop');
    const operationLdw = OperationsManager.getOperationByName('ldw');
    const operationAdd = OperationsManager.getOperationByName('add');
    if (instruction.getOperation().getName() !== operationPop.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 1) return [];

    if (operands[0].getType() === 'register') {
      // pop r1 -> [ ldw r1, sp   add sp, 2 ]
      return [
        new Instruction(operationLdw, [operands[0], new Operand('sp', Operand.REGISTER)]),
        new Instruction(operationAdd, [new Operand('sp', Operand.REGISTER), new Operand(2, Operand.LITERAL)]),
      ];
    }
    return [];
  }
}
