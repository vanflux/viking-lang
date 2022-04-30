import { readFileSync } from 'fs';
import { ArchitectureManager } from './common/architectureManager';
import { Assembler } from './assembler/assembler';
import { Disassembler } from './disassembler/disassembler';
import { PseudoConverter } from './assembler/pseudoConverter';
import { ConsoleDevice } from './simulator/io/devices/consoleDevice';
import { Memory } from './simulator/memory';
import { RegisterBank } from './simulator/registerBank';
import { Simulation } from './simulator/simulation';
import { getAllPseudos } from './assembler/pseudos';

export async function main() {
  const code = readFileSync('src/ex1.asm', 'utf8');
  const architecture = ArchitectureManager.getViking16Arch();
  const pseudoConverter = new PseudoConverter(getAllPseudos());
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
