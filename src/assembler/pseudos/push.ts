import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common/operations/operationsManager';

export class PC_Push implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationPush = OperationsManager.getOperationByName('push');
        const operationSub = OperationsManager.getOperationByName('sub');
        const operationStw = OperationsManager.getOperationByName('stw');
        if (instruction.getOperation().getName() !== operationPush.getName()) return [];

        let operands = instruction.getOperands();
        if (operands.length !== 1) return [];

        if (operands[0].getType() === 'register') {
            // push r1 -> [ sub sb, 2   stw r1, sp ]
            return [
                new Instruction(operationSub, [ new Operand('sp', Operand.REGISTER), new Operand(2, Operand.LITERAL) ]),
                new Instruction(operationStw, [ operands[0], new Operand('sp', Operand.REGISTER) ]),
            ];
        }
        return [];
    }
};
