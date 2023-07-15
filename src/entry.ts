import { ArchitectureManager } from './common';
import { Assembler } from './assembler';
import { PseudoConverter } from './assembler';
import { ConsoleDevice } from './simulator';
import { Memory } from './simulator';
import { RegisterBank } from './simulator';
import { Simulation } from './simulator';
import { getAllPseudos } from './assembler';
import { Compiler, CodeGen } from './compiler';

export async function main() {
  const start = Date.now();

  const langCode = `
  int main() {
    int a = 0;
    int b = 0;
    int c = 0;
    int d = 0;
    if (a < 1) {
      return fib(test(7));
    }
    int f = a + b + c + d;
    return 3;
  }

  int test(int n) {
    int a = 0;
    while (a < n) {
      a = a + one();
    }
    return a;
  }

  int one() {
    return 1;
  }
  
  int fib(int n) {
    if (n < 1) {
      return 0;
    }
    if (n < 2) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  }
  `;

  const architecture = ArchitectureManager.getViking16Arch();

  const compiler = new Compiler(architecture, new CodeGen());
  const { code: asmCode } = compiler.compile(langCode);
  console.log('[ASM]');
  console.log(asmCode);

  const pseudoConverter = new PseudoConverter(getAllPseudos());
  const assembler = new Assembler(architecture, pseudoConverter);
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

    const end = Date.now();
    console.log('Time:', end - start, 'ms');
  });
  
  assembler.addExtraSymbolTable(simulation.getPortsSymbolTable());
  const { rawObjectCode } = assembler.assemble(asmCode);
  simulation.setRawObjCode(rawObjectCode!);
  simulation.run();
}

main();
