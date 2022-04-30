import { readFileSync } from "fs";
import { ArchitectureManager } from "./architectureManager";
import Assembler from "./assembler/assembler";
import Disassembler from "./disassembler/disassembler";
import { PseudoConverter } from "./assembler/pseudoConverter";
import { PC_Asr } from "./assembler/pseudos/asr";
import { PC_Bez } from "./assembler/pseudos/bez";
import { PC_Bnz } from "./assembler/pseudos/bnz";
import { PC_Hcf } from "./assembler/pseudos/hcf";
import { PC_Ldb } from "./assembler/pseudos/ldb";
import { PC_Ldi } from "./assembler/pseudos/ldi";
import { PC_Ldw } from "./assembler/pseudos/ldw";
import { PC_Lsl } from "./assembler/pseudos/lsl";
import { PC_Lsr } from "./assembler/pseudos/lsr";
import { PC_Mov } from "./assembler/pseudos/mov";
import { PC_Neg } from "./assembler/pseudos/neg";
import { PC_Nop } from "./assembler/pseudos/nop";
import { PC_Not } from "./assembler/pseudos/not";
import { PC_Pop } from "./assembler/pseudos/pop";
import { PC_Push } from "./assembler/pseudos/push";
import { PC_Ror } from "./assembler/pseudos/ror";
import { PC_Stb } from "./assembler/pseudos/stb";
import { PC_Stw } from "./assembler/pseudos/stw";
import { PC__Large_Immediate } from "./assembler/pseudos/_large_immediate";
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
