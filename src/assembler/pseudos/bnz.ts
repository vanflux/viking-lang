import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common/operations/operationsManager';

export class PC_Bnz implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationBnz = OperationsManager.getOperationByName('bnz');
        const operationLdi = OperationsManager.getOperationByName('ldi');
        if (instruction.getOperation().getName() !== operationBnz.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        if (operands[0].getType() === 'register') {
            switch (operands[1].getType()) {
                case 'register':
                    // bnz r1, r2 -> [ bnz r0, r1, r2 ]
                    return [
                        new Instruction(operationBnz, [ new Operand('r0', Operand.REGISTER), operands[0], operands[1] ]),
                    ];
                case 'symbol':
                    // bnz r1, sym -> [ ldi at, sym   bnz r0, r1, at ]
                    return [
                        new Instruction(operationLdi, [ new Operand('at', Operand.REGISTER), operands[1] ]),
                        new Instruction(operationBnz, [ new Operand('r0', Operand.REGISTER), operands[0], new Operand('at', Operand.REGISTER) ]),
                    ];
                default:
            }
        }
        return [];
    }
};
