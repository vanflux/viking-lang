import { Architecture } from '../../common/architecture';
import { Instruction } from '../../common/instruction';
import { Operand } from '../../common/operand';
import { OperationsManager } from '../../common/operations/operationsManager';
import { Pseudo } from '../pseudoConverter';

export class PC_Stw implements Pseudo {
  convert(instruction: Instruction, architecture: Architecture) {
    const stw = OperationsManager.getOperationByName('stw');

    if (instruction.getOperation().getName() !== stw.getName()) return [];

    let operands = instruction.getOperands();
    if (operands.length !== 2) return [];

    if (operands[0].getType() === 'register') {
      switch (operands[1].getType()) {
        case 'register':
          // stw r1, r2 -> [ stw r0, r1, r2 ]
          return [new Instruction(stw, [new Operand('r0', Operand.REGISTER), operands[0], operands[1]])];
        case 'symbol':
        case 'literal':
          // stw r1, lit -> [ ldi at, lit   stw r0, r1, at ]
          const ldi = OperationsManager.getOperationByName('ldi');
          return [
            new Instruction(ldi, [new Operand('at', Operand.REGISTER), operands[1]]),
            new Instruction(stw, [new Operand('r0', Operand.REGISTER), operands[0], new Operand('at', Operand.REGISTER)]),
          ];
        default:
      }
    }
    return [];
  }
}
