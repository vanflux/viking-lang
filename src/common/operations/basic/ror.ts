import { Simulation } from '../../../simulator/simulation';
import { BasicOperation } from '../operation';

export class B_Ror extends BasicOperation {
  getName() {
    return 'ror';
  }
  getOpcode() {
    return 0xa002;
  }
  supportR() {
    return true;
  }
  supportI() {
    return false;
  }
  executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
    let registerBank = simulation.getRegisterBank();
    let architecture = simulation.getArchitecture();

    let value = registerBank.getUValue(rsa);
    registerBank.setValue(rst, (value >> 1) | (simulation.getCarry() << (architecture.getBitWidth() - 1)));
    simulation.setCarry(value & 1);
  }
  executeI(simulation: Simulation, rst: string, immediate: number): void {
    throw new Error('Method not implemented.');
  }
}
