import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Operand } from '../../operand';
import { Pseudo } from '../pseudo';
import { OperationsManager } from '../../operations/operationsManager';

export class PC_Hcf implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationHcf = OperationsManager.getOperationByName('hcf');
        if (instruction.getOperation().getName() !== operationHcf.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 0) return [];

        // hcf -> [ ldb r0, r0, r0 ]
        return [
            new Instruction(operationHcf, [ 
                new Operand('r0', Operand.REGISTER), 
                new Operand('r0', Operand.REGISTER), 
                new Operand('r0', Operand.REGISTER)
            ]),
        ];
    }
};