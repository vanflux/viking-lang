import { ArchitectureManager } from './common';
import { Assembler } from './assembler';
import { PseudoConverter } from './assembler';
import { ConsoleDevice } from './simulator';
import { Memory } from './simulator';
import { RegisterBank } from './simulator';
import { Simulation } from './simulator';
import { getAllPseudos } from './assembler';
import { Compiler, GoodCodeGen, DumbCodeGen } from './compiler';

export async function main() {
  const start = Date.now();

  /*const langCode = `
  int test(int a, int b) {
    int c = a + b;
    int d = 0;
    int e = 1;
    while (d < 10) {
      c = c + e;
      if (e < 5) {
        e = e + 1;
      } else {
        e = e + 2;
        c = c + 1;
      }
      d = d + 1;
    }
    int f = ((-(1 - c)) + 55 + 3 - (c + c));
    return 5 - f;
  }

  int main() {
    test(1, test(2, 3) + test(4, 5));
  }
  `;*/
  
  const langCode = `
  int main() {
    int b = 0;
    return double(quad(1));
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

  /*const langCode = `
  int main(int a, int b) {
    int c = 4;
    if (c < 5) {
      while(c < 60) {
        int i = 0;
        while(i < 2) {
          c = c + i;
          i = i + 1;
        }
      }
    } else {
      c = c + 1;
    }
    return c;
  }
  `;*/

  const architecture = ArchitectureManager.getViking16Arch();

  const compiler = new Compiler(architecture, new GoodCodeGen());
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
