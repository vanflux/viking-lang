import { readFileSync } from "fs";
import { ArchitectureManager } from "./architectureManager";
import Assembler from "./assembler/assembler";
import Disassembler from "./disassembler/disassembler";
import { PseudoConverter } from "./pseudoInstructionConversions/pseudoConverter";
import { PC_Asr } from "./pseudoInstructionConversions/pseudos/asr";
import { PC_Bez } from "./pseudoInstructionConversions/pseudos/bez";
import { PC_Bnz } from "./pseudoInstructionConversions/pseudos/bnz";
import { PC_Hcf } from "./pseudoInstructionConversions/pseudos/hcf";
import { PC_Ldb } from "./pseudoInstructionConversions/pseudos/ldb";
import { PC_Ldi } from "./pseudoInstructionConversions/pseudos/ldi";
import { PC_Ldw } from "./pseudoInstructionConversions/pseudos/ldw";
import { PC_Lsl } from "./pseudoInstructionConversions/pseudos/lsl";
import { PC_Lsr } from "./pseudoInstructionConversions/pseudos/lsr";
import { PC_Mov } from "./pseudoInstructionConversions/pseudos/mov";
import { PC_Neg } from "./pseudoInstructionConversions/pseudos/neg";
import { PC_Nop } from "./pseudoInstructionConversions/pseudos/nop";
import { PC_Not } from "./pseudoInstructionConversions/pseudos/not";
import { PC_Pop } from "./pseudoInstructionConversions/pseudos/pop";
import { PC_Push } from "./pseudoInstructionConversions/pseudos/push";
import { PC_Ror } from "./pseudoInstructionConversions/pseudos/ror";
import { PC_Stb } from "./pseudoInstructionConversions/pseudos/stb";
import { PC_Stw } from "./pseudoInstructionConversions/pseudos/stw";
import { PC__Large_Immediate } from "./pseudoInstructionConversions/pseudos/_large_immediate";
import { ConsoleDevice } from "./simulator/io/devices/consoleDevice";
import Memory from "./simulator/memory";
import { RegisterBank } from "./simulator/registerBank";
import { Simulation } from "./simulator/simulation";

export async function main() {
    const code = readFileSync('src/ex1.asm', 'utf8');
    const architecture = ArchitectureManager.getViking16Arch();
    const pseudoConverter = new PseudoConverter([
        new PC__Large_Immediate(),
        new PC_Asr(),
        new PC_Bez(),
        new PC_Bnz(),
        new PC_Hcf(),
        new PC_Ldb(),
        new PC_Ldi(),
        new PC_Ldw(),
        new PC_Lsr(),
        new PC_Lsl(),
        new PC_Mov(),
        new PC_Neg(),
        new PC_Nop(),
        new PC_Not(),
        new PC_Pop(),
        new PC_Push(),
        new PC_Ror(),
        new PC_Stb(),
        new PC_Stw(),
    ]);
    const assembler = new Assembler(architecture, code, pseudoConverter);
    const result = assembler.assemble();

    const disassembler = new Disassembler(architecture);
    const instructions = disassembler.disassemble(result.rawObjectCode!);
    console.log(instructions.map(x => x.pc + '->' + x.instruction?.toString()).join('\n'));

    const memory = Memory.createFromArchitecture(architecture);
    const registerBank = RegisterBank.createFromArchitecture(architecture);
    const simulation = new Simulation(architecture, memory, registerBank);
    const consoleDevice = new ConsoleDevice();
    consoleDevice.on('write int', console.log);
    consoleDevice.on('write char', console.log);
    consoleDevice.on('input buffer', buffer => console.log('console device input buffer:', buffer));
    consoleDevice.on('waiting', waiting => console.log('console device waiting:', waiting));

    simulation.registerPorts(consoleDevice.getPorts());
    simulation.setStepInterval(0);

    //simulation.on('pc update', pc => console.log('pc update', pc));
    simulation.on('run ended', () => {
        console.log('[Simulation] Run ended!');
        console.log('Registers:');
        registerBank.print();
        console.log('PC:', simulation.getPC(), simulation.getPC().toString(16));
        console.log('Cycles:', simulation.getCycles());
    });
    //simulation.on('cycles update', cycles => console.log('cycles update', cycles));
    simulation.setRawObjCode(result.rawObjectCode!);
    simulation.run();
}

main();
