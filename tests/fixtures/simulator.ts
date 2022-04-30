import { ArchitectureManager } from '../../src/common/architectureManager';
import { ConsoleDevice } from '../../src/simulator/io/devices/consoleDevice';
import { Memory } from '../../src/simulator/memory';
import { RegisterBank } from '../../src/simulator/registerBank';
import { Simulation } from '../../src/simulator/simulation';

export interface SimulateOutputingConsoleResult {
  numbers: number[];
  chars: string[];
}

export async function simulateOutputingConsole(rawObjectCode: string): Promise<SimulateOutputingConsoleResult> {
  const numbers: number[] = [];
  const chars: string[] = [];
  const architecture = ArchitectureManager.getViking16Arch();
  const memory = Memory.createFromArchitecture(architecture);
  const registerBank = RegisterBank.createFromArchitecture(architecture);
  const simulation = new Simulation(architecture, memory, registerBank);
  const consoleDevice = new ConsoleDevice();
  consoleDevice.on('write int', num => numbers.push(num));
  consoleDevice.on('write char', char => chars.push(char));
  simulation.registerPorts(consoleDevice.getPorts());
  simulation.setStepInterval(0);
  simulation.setRawObjCode(rawObjectCode);

  return new Promise(resolve => {
    simulation.on('run ended', () => resolve({ numbers, chars }));
    simulation.run();
  });
}
