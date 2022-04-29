
import { Simulation } from "../../simulator/simulation";
import { BasicOperation } from "../operation";

export class B_Sbc extends BasicOperation {
    getName() { return 'sbc' }
    getOpcode() { return 0x6001 }
    supportR() { return true }
    supportI() { return false }
    executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
        let registerBank = simulation.getRegisterBank();
        let carry = simulation.getCarry();

        registerBank.setValue(
            rst, 
            registerBank.getValue(rsa) - registerBank.getValue(rsb) - carry,
        );
    }
    executeI(simulation: Simulation, rst: string, immediate: number): void {
        throw new Error("Method not implemented.");
    }
}
