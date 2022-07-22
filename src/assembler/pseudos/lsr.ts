import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common';

export class PC_Lsr implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationLsr = OperationsManager.getOperationByName('lsr');
    if (instruction.getOperation().getName() !== operationLsr.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    return [new Instruction(operationLsr, [operands[0], operands[1], new Operand('r0', Operand.REGISTER)])];
  }
}
