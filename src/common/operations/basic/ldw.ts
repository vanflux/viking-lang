import { Simulation } from '../../../simulator';
import { BasicOperation } from '../operation';

export class B_Ldw extends BasicOperation {
  getName() {
    return 'ldw';
  }
  getOpcode() {
    return 0x4002;
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

    registerBank.setValue(rst, memory.readWord(registerBank.getUValue(rsb)));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
