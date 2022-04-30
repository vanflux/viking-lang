
import { Simulation } from "../../../simulator/simulation";
import { BasicOperation } from "../operation";

export class B_Ldc extends BasicOperation {
    getName() { return 'ldc' }
    getOpcode() { return 0x9000 }
    supportR() { return false }
    supportI() { return true }
    executeR(simulation: Simulation, rst: string, rsa: string, rsb: string): void {
        throw new Error("Method not implemented.");
    }
    executeI(simulation: Simulation, rst: string, immediate: number): void {
        let registerBank = simulation.getRegisterBank();

        registerBank.setValue(
            rst, 
            (registerBank.getUValue(rst) << 8) | (immediate & 0xFF),
        );
    }
}
