import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Operand } from '../../operand';
import { OperationsManager } from '../../operations/operationsManager';
import { Pseudo } from '../pseudo';

let supportedOpNames = new Set([ 'and', 'or', 'xor', 'slt', 'add', 'sub', 'bez', 'bnz' ]);

export class PC__Large_Immediate implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationLdi = OperationsManager.getOperationByName('ldi');
        if (!supportedOpNames.has(instruction.getOperation().getName())) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 2) return [];

        if (operands[0].getType() === 'register') {
            switch (operands[1].getType()) {
                case 'literal':
                    let literal = operands[1].getValue();
                    if (literal > 127 || literal < -128) {
                        return [
                            new Instruction(operationLdi, [ new Operand('at', Operand.REGISTER), new Operand(literal, Operand.LITERAL) ]),
                            new Instruction(instruction.getOperation(), [ operands[0], operands[0], new Operand('at', Operand.REGISTER) ]),
                        ];
                    }
                    break;
                default:
            }
        }

        return [];
    }
};
