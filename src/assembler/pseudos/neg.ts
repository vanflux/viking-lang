import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Neg implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationNeg = OperationsManager.getOperationByName('neg');
    const operationXor = OperationsManager.getOperationByName('xor');
    const operationAdd = OperationsManager.getOperationByName('add');
    if (instruction.getOperation().getName() !== operationNeg.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 1) return [];
    if (operands[0].getType() !== Operand.REGISTER) return [];

    return [
      new Instruction(operationXor, [operands[0], new Operand(-1, Operand.LITERAL)]),
      new Instruction(operationAdd, [operands[0], new Operand(1, Operand.LITERAL)]),
    ];
  }
}
