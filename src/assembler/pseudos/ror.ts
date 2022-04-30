import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common/operations/operationsManager';

export class PC_Ror implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationRor = OperationsManager.getOperationByName('ror');
        if (instruction.getOperation().getName() !== operationRor.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        return [
            new Instruction(operationRor, [ operands[0], operands[1], new Operand('r0', Operand.REGISTER) ]),
        ];
    }
};
