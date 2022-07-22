import { ArchitectureManager } from './common';
import { Assembler } from './assembler';
import { PseudoConverter } from './assembler';
import { ConsoleDevice } from './simulator';
import { Memory } from './simulator';
import { RegisterBank } from './simulator';
import { Simulation } from './simulator';
import { getAllPseudos } from './assembler';
import { Compiler } from './compiler';

export async function main() {
  const start = Date.now();

  const code = `
  a = 0;
  printn(a);
  }
  `;

  const compiler = new Compiler();
  const compiled = compiler.compile(code);
  console.log('[Compiled]');
  console.log(compiled);

  const architecture = ArchitectureManager.getViking16Arch();
  const pseudoConverter = new PseudoConverter(getAllPseudos());
  const assembler = new Assembler(architecture, compiled, pseudoConverter);
  const result = assembler.assemble();

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

  simulation.on('run ended', () => {
    console.log('[Simulation] Run ended!');
  });
  simulation.setRawObjCode(result.rawObjectCode!);
  simulation.run();

  const end = Date.now();
  console.log('Time:', end - start, 'ms');
}

main();
