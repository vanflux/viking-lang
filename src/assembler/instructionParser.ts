import { OperationsManager } from '../common/operations/operationsManager';
import { Architecture } from '../common/architecture';
import { Instruction } from '../common/instruction';
import { Operand } from '../common/operand';
import { isInteger } from '../common/utils';

export class InstructionParser {
    private architecture: Architecture;

    constructor(architecture: Architecture) {
        this.architecture = architecture;
    }

    isInstruction(str: string) {
        try {
            let operation = this.parseOperation(str);
            return operation != null;
        } catch (exc) {
            return false;
        }
    }
    
    parse(str: string) {
        // parse operation & operands
        let operation = this.parseOperation(str);
        let operands = this.parseOperands(str);

        let instruction = new Instruction(operation, operands);
        return instruction;
    }
    

    // detect if str is register
    isRegisterName(str: string) {
        return this.architecture.hasRegisterName(str);
    }

    // detect if str is operation
    isOperationName(str: string) {
        return OperationsManager.isOperationName(str);
    }

    // parse operation
    parseOperation(str: string) {
        let match = str.match(/^(\w*)[\t ]*/);
        if (!Array.isArray(match) || match.length < 2) throw new TypeError('Cant parse to operation');

        let operationName = match[1];
        if (!this.isOperationName(operationName)) throw new TypeError('"' + operationName + '" isnt operation');
        
        let operation = OperationsManager.getOperationByName(operationName);
        if (!operation) throw new Error('Operation with name "' + operationName + '" not found');

        return operation;
    }

    // detect type of operand value
    getInstructionOperandValueType(operandValue: string) {
        if (typeof operandValue !== 'string') return null;
        if (operandValue.length === 0) return null;

        if (this.isRegisterName(operandValue)) return 'register';
        if (isInteger(operandValue)) return 'literal';
        return 'symbol';
    }
    
    // parse operands
    parseOperands(str: string) {
        let operands = [];

        let match = str.match(/^\w+[ \t]+(.+)/);
        if (Array.isArray(match) && match.length >= 2) {
            let operandsStr = match[1];
            let operandsValues = operandsStr.split(/[\t ]*,[\t ]*/);
            for (let operandValue of operandsValues) {
                let value: string | number = operandValue.trim();
                let type = this.getInstructionOperandValueType(value);
                if (type === null) {
                    throw new Error('Operand "' + value + '" cant be parsed');
                }
                if (type === Operand.LITERAL) {
                    value = parseInt(value);
                }
                operands.push(new Operand(value, type));
            }
        }
        
        return operands;
    }
}