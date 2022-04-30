import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../operations/operationsManager';

export class PC_Lsl implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationLsl = OperationsManager.getOperationByName('lsl');
        const operationAdd = OperationsManager.getOperationByName('add');
        if (instruction.getOperation().getName() !== operationLsl.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        if (operands[0].getType() === 'register') {
            switch (operands[1].getType()) {
                case 'register':
                    // lsl r1, r2 -> [ add r1, r2, r2 ]
                    return [
                        new Instruction(operationAdd, [ operands[0], operands[1], operands[1] ]),
                    ];
                default:
            }
        }
        return [];
    }
};
