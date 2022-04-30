import { Simulation } from '../../../simulator/simulation';
import { BasicOperation } from '../operation';

export class B_Stb extends BasicOperation {
  getName() {
    return 'stb';
  }
  getOpcode() {
    return 0x1002;
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

    memory.writeByte(registerBank.getUValue(rsb), registerBank.getUValue(rsa));
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
