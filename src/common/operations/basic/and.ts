import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_And extends BasicOperation {
  getName() {
    return 'and';
  }
  getOpcode() {
    return 0x0000;
  }
  supportR() {
    return true;
  }
  supportI() {
    return true;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getUValue(rsa) & registerBank.getUValue(rsb));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    let registerBank = simulation.getRegisterBank();

    registerBank.setValue(rst, registerBank.getUValue(rst) & immediate);
  }
}
