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
    int a = 1;
    int b = 2;
    int c = 3;
    int d = double(2);
    int e = quad(a) + 1;
    int f = mul(2, 3);
    int sum = (((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (mul(2, 2) + 1 + f))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    )) + ((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    ))) + (((
      (((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + mul(2, 3)))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    )) + ((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + double(c))))
    )));
    return sum;
  }

  int double(int a) {
    return a + a;
  }

  int quad(int a) {
    int i = 0;
    int b = 0;
    while (i < 4) {
      b = b + a;
      i = i + 1;
    }
    return b;
  }

  int mul(int a, int b) {
    int result = 0;
    while (b > 0) {
      result = result + a;
      b = b - 1;
    }
    return result;
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
