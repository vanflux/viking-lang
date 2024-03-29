import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Not implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationNot = OperationsManager.getOperationByName('not');
    const operationXor = OperationsManager.getOperationByName('xor');
    if (instruction.getOperation().getName() !== operationNot.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 1) return [];
    if (operands[0].getType() !== Operand.REGISTER) return [];

    return [new Instruction(operationXor, [operands[0], new Operand(-1, Operand.LITERAL)])];
  }
}
