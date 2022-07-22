import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Nop implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationAnd = OperationsManager.getOperationByName('and');
    const operationNop = OperationsManager.getOperationByName('nop');
    if (instruction.getOperation().getName() !== operationNop.getName()) return [];

    return [
      new Instruction(operationAnd, [
        new Operand('r0', Operand.REGISTER),
        new Operand('r0', Operand.REGISTER),
        new Operand('r0', Operand.REGISTER),
      ]),
    ];
  }
}
