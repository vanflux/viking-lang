
import { Simulation } from "../../simulator/simulation";
import { BasicOperation } from "../operation";

export class B_Sub extends BasicOperation {
    getName() { return 'sub' }
    getOpcode() { return 0x6000 }
    supportR() { return true }
    supportI() { return true }
    executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
        let registerBank = simulation.getRegisterBank();

        registerBank.setValue(
            rst, 
            registerBank.getValue(rsa) - registerBank.getValue(rsb),
        );
    }
    executeI(simulation: Simulation, rst: string, immediate: number): void {
        let registerBank = simulation.getRegisterBank();

        registerBank.setValue(
            rst, 
            registerBank.getValue(rst) - immediate,
        );
    }
}
