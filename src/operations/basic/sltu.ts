
import { Simulation } from "../../simulator/simulation";
import { BasicOperation } from "../operation";

export class B_Sltu extends BasicOperation {
    getName() { return 'sltu' }
    getOpcode() { return 0x4000 }
    supportR() { return true }
    supportI() { return true }
    executeR(simulation: Simulation, rst: string, rsa: string, rsb: string) {
        let registerBank = simulation.getRegisterBank();

        registerBank.setValue(
            rst, 
            registerBank.getUValue(rsa) < registerBank.getUValue(rsb) ? 1 : 0,
        );
    }
    executeI(simulation: Simulation, rst: string, immediate: number): void {
        let registerBank = simulation.getRegisterBank();

        registerBank.setValue(
            rst, 
            registerBank.getUValue(rst) < (immediate >>> 0) ? 1 : 0,
        );
    }
}
