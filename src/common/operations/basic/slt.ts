import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_Slt extends BasicOperation {
  getName() {
    return 'slt';
  }
  getOpcode() {
    return 0x3000;
  }
  supportR() {
    return true;
  }
  supportI() {
    return true;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getValue(rsa) < registerBank.getValue(rsb) ? 1 : 0);
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getValue(rst) < immediate ? 1 : 0);
  }
}
