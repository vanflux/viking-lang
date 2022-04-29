import { Architecture } from '../../architecture';
import { Instruction } from '../../instruction';
import { Operand } from '../../operand';
import { Pseudo } from '../pseudo';
import { OperationsManager } from '../../operations/operationsManager';

export class PC_Nop implements Pseudo {
    convert(instruction: Instruction, architecture: Architecture) {
        const operationAnd = OperationsManager.getOperationByName('and');
        const operationNop = OperationsManager.getOperationByName('nop');
        if (instruction.getOperation().getName() !== operationNop.getName()) return [];
        
        return [
            new Instruction(operationAnd, [ new Operand('r0', Operand.REGISTER), new Operand('r0', Operand.REGISTER), new Operand('r0', Operand.REGISTER) ] ),
        ];
    }
};
