import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_Ldb extends BasicOperation {
  getName() {
    return 'ldb';
  }
  getOpcode() {
    return 0x0002;
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

    registerBank.setValue(rst, memory.readByte(registerBank.getUValue(rsb)));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
