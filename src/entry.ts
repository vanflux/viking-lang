import { readFileSync } from 'fs';
import { ArchitectureManager } from './common';
import { Assembler } from './assembler';
import { Disassembler } from './disassembler';
import { PseudoConverter } from './assembler';
import { ConsoleDevice } from './simulator';
import { Memory } from './simulator';
import { RegisterBank } from './simulator';
import { Simulation } from './simulator';
import { getAllPseudos } from './assembler';
import { Compiler } from './compiler';
import { ValueAllocator } from './compiler';
import { Generator } from './compiler';

export async function main() {
  const start = Date.now();

  /*const code = `
    a = 3;
    b = 2;
    c = (a - 1) + (1 - (b + a));
  `;*/

  /*const code = `
  a = 10;
  b = 5;
  c = 7;
  d = 52;

  ea = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  eb = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  ec = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  ed = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  ee = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  ef = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  eg = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));
  eh = (a + a) - (b + d + a) + (c + c + a) - (d + (a + (c + c + c)));

  z = 1
  y = 2
  x = 3
  v = 4
  `;*/

  /*const code = `
  a = 3;
  b = 6;
  if (a < (b - 2)) {
    c = 5;
    if (a < c) {
      d = 10;
    }
  } else {
    h = 20;
  }
  `;*/

  /*const code = `
  a = 3;
  b = 6;
  print(0);
  if (a < b - 2) {
    print(1);
    c = a;
    if (a < c) {
      print(2);
      d = 10;
    }
  } else {
    print(3);
    h = 20;
  }
  print(4);
  `;*/

  // TODO: Fix that problem

  // when the code is being generated the "a" variable
  // is deallocated from register and allocated to stack
  // ONLY ON ELSE STAGE, if the else is not executed
  // the "a" variable is not saved to stack, after the
  // if statement the code tries to load from stack and
  // the value is zero instead 8.

  // something similar happens with the while statement
  // the next statements after the while doesnt know
  // where the variables are

  // solution 1: after each if else block restore the
  // variables to the same registers or stack position

  /*const code = `
  a = 8;
  b = 4;
  if (b < a) {

  } else {
    e = 1;
    f = 1;
    g = 1;
  }
  print(a)
  `;*/

  /*const code = `
  i = 0;
  while(i < 5) {
    print(i);
    print(99)
    i = i + 1;
  }
  `;*/

  /*const gen = new Generator();
  const valueAllocator = new ValueAllocator(gen);
  const id1 = valueAllocator.allocateId();
  const id2 = valueAllocator.allocateId();
  const id3 = valueAllocator.allocateId();
  const id4 = valueAllocator.allocateId();
  const id5 = valueAllocator.allocateId();
  valueAllocator.setLiteral(id1, 1);
  valueAllocator.ensureOnRegister(id1, true);
  valueAllocator.setValue(id1, id2);
  valueAllocator.setValue(id2, id3);
  valueAllocator.setValue(id3, id4);
  valueAllocator.setValue(id4, id5);
  console.log(valueAllocator);*/

  /*const code = `
  a = 2;
  b = 5;
  c = 90;
  d = -23;
  e = -777;

  x1 = (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x2 = 1 - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x3 = - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x4 = (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d))) - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  
  printn(x1);
  printn(x2);
  printn(x3);
  printn(x4);
  printn(a);
  printn(b);
  printn(c);
  printn(d);
  printn(e);
  `;*/

  /*const code = `
  a = 1;
  b = 2;
  c = 3;
  d = 4;
  if (a > b) {
    e = 77;
    a = 11;
  } else {
    if (c > d) {
      e = 88;
      a = 22;
    } else {
      e = 99;
      a = 33;
    }
  }
  printn(a);
  printn(b);
  printn(c);
  printn(d);
  printn(e);
  `;*/

  /*const code = `
  a = 0;
  b = 2;
  while(a < 5) {
    printn(a);
    a = a + 1;
    b = b + 2;
  }
  printn(a);
  printn(b);
  `;*/

  /*const code = `
  a = 0;
  b = 1;
  while(a < 30) {
    a = a + 1;
    if (a > 5+1-3+b) {
      if (a < 9-b) {
        printn(a);
      } else {
        if (a+1 > 13) {
          if (a-2 < 18) {
            printn(a);
          }
        }
      }
    }
  }
  `;*/

  const code = `
  x = 0;
  y = 0;
  width = 4;
  height = 4;
  while(y < height) {
    x = 0;
    while(x < width) {
      printn(x);
      printn(y);
      printn(1000);
      x = x + 1;
    }
    y = y + 1;
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
