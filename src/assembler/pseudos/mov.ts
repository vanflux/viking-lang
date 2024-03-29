import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Mov implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationMov = OperationsManager.getOperationByName('mov');
    const operationAnd = OperationsManager.getOperationByName('and');
    if (instruction.getOperation().getName() !== operationMov.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];
    if (operands[0].getType() !== Operand.REGISTER) return [];
    if (operands[1].getType() !== Operand.REGISTER) return [];

    return [new Instruction(operationAnd, [operands[0], operands[1], operands[1]])];
  }
}
