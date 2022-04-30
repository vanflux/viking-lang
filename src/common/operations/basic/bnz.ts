
import { Simulation } from "../../../simulator/simulation";
import { BasicOperation } from "../operation";

export class B_Bnz extends BasicOperation {
    getName() { return 'bnz' }
    getOpcode() { return 0xD000 }
    supportR() { return true }
    supportI() { return true }
    executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
        let registerBank = simulation.getRegisterBank();

        if (registerBank.getValue(rsa) !== 0) {
            simulation.setPC(registerBank.getValue(rsb) - 2);
        }
    }
    executeI(simulation: Simulation, rst: string, immediate: number): void {
        let registerBank = simulation.getRegisterBank();

        if (registerBank.getValue(rst) !== 0) {
            simulation.setPC(simulation.getPC() + immediate);
        }
    }
}
