import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_Stw extends BasicOperation {
  getName() {
    return 'stw';
  }
  getOpcode() {
    return 0x5002;
  }
  supportR() {
    return true;
  }
  supportI() {
    return false;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();
    let memory = simulation.getMemory();

    memory.writeWord(registerBank.getUValue(rsb), registerBank.getUValue(rsa));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
