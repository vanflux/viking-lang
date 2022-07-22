import { Architecture } from '../../common';
import { Instruction } from '../../common';
import { Operand } from '../../common';
import { OperationsManager } from '../../common';
import { Pseudo } from '../pseudoConverter';

export class PC_Asr implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationAsr = OperationsManager.getOperationByName('asr');
    if (instruction.getOperation().getName() !== operationAsr.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    return [new Instruction(operationAsr, [operands[0], operands[1], new Operand('r0', Operand.REGISTER)])];
  }
}
