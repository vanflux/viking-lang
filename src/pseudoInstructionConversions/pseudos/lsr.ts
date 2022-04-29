import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Operand } from '../../operand';
import { Pseudo } from '../pseudo';
import { OperationsManager } from '../../operations/operationsManager';

export class PC_Lsr implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationLsr = OperationsManager.getOperationByName('lsr');
        if (instruction.getOperation().getName() !== operationLsr.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        return [
            new Instruction(operationLsr, [ operands[0], operands[1], new Operand('r0', Operand.REGISTER) ]),
        ];
    }
};