import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_Asr extends BasicOperation {
  getName() {
    return 'asr';
  }
  getOpcode() {
    return 0xa001;
  }
  supportR() {
    return true;
  }
  supportI() {
    return false;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();

    let value = registerBank.getValue(rsa);
    simulation.setCarry(value & 1);
    registerBank.setValue(rst, value >> 1);
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
