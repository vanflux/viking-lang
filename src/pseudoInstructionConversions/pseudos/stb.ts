import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Operand } from '../../operand';
import { OperationsManager } from '../../operations/operationsManager';
import { Pseudo } from '../pseudo';

export class PC_Stb implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationStb = OperationsManager.getOperationByName('stb');
        const operationLdi = OperationsManager.getOperationByName('ldi');
        if (instruction.getOperation().getName() !== operationStb.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        if (operands[0].getType() === 'register') {
            switch (operands[1].getType()) {
                case 'register':
                    // stb r1, r2 -> [ stb r0, r1, r2 ]
                    return [
                        new Instruction(operationStb, [ new Operand('r0', Operand.REGISTER), operands[0], operands[1] ]),
                    ];
                case 'symbol':
                case 'literal':
                    // stb r1, lit -> [ ldi at, lit   stb r0, r1, at ]
                    return [
                        new Instruction(operationLdi, [ new Operand('at', Operand.REGISTER), operands[1] ]),
                        new Instruction(operationStb, [ new Operand('r0', Operand.REGISTER), operands[0], new Operand('at', Operand.REGISTER) ]),
                    ];
                default:
            }
        }
        return [];
    }
};
