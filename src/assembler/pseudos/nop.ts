import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common/operations/operationsManager';

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
