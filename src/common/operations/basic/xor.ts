import { Simulation } from '../../../simulator/simulation';
import { BasicOperation } from '../operation';

export class B_Xor extends BasicOperation {
  getName() {
    return 'xor';
  }
  getOpcode() {
    return 0x2000;
  }
  supportR() {
    return true;
  }
  supportI() {
    return true;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getUValue(rsa) ^ registerBank.getUValue(rsb));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getUValue(rst) ^ immediate);
  }
}
