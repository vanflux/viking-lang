import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { Pseudo } from '../pseudoConverter';
import { OperationsManager } from '../../common/operations/operationsManager';

export class PC_Ldb implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const operationLdb = OperationsManager.getOperationByName('ldb');
    const operationLdi = OperationsManager.getOperationByName('ldi');
    if (instruction.getOperation().getName() !== operationLdb.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    if (operands[0].getType() === 'register') {
      switch (operands[1].getType()) {
        case 'register':
          // ldb r1, r2 -> [ ldb r1, r0, r2 ]
          return [new Instruction(operationLdb, [operands[0], new Operand('r0', Operand.REGISTER), operands[1]])];
        case 'symbol':
        case 'literal':
          // ldb r1, 0 -> [ ldi at, 0   ldb r1, r0, at ]
          return [
            new Instruction(operationLdi, [new Operand('at', Operand.REGISTER), operands[1]]),
            new Instruction(operationLdb, [operands[0], new Operand('r0', Operand.REGISTER), new Operand('at', Operand.REGISTER)]),
          ];
        default:
      }
    }
    return [];
  }
}
