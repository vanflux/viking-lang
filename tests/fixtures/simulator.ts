import { ArchitectureManager } from '../../src/common/architectureManager';
import { ConsoleDevice } from '../../src/simulator/io/devices/consoleDevice';
import { Memory } from '../../src/simulator/memory';
import { RegisterBank } from '../../src/simulator/registerBank';
import { Simulation } from '../../src/simulator/simulation';

export async function simulateOutputingConsoleNumbers(rawObjectCode: string) {
  const consoleNumberOutput: number[] = [];
  const architecture = ArchitectureManager.getViking16Arch();
  const memory = Memory.createFromArchitecture(architecture);
  const registerBank = RegisterBank.createFromArchitecture(architecture);
  const simulation = new Simulation(architecture, memory, registerBank);
  const consoleDevice = new ConsoleDevice();
  consoleDevice.on('write int', num => consoleNumberOutput.push(num));
  simulation.registerPorts(consoleDevice.getPorts());
  simulation.setStepInterval(0);
  simulation.setRawObjCode(rawObjectCode);

  return new Promise(resolve => {
    simulation.on('run ended', () => resolve(consoleNumberOutput));
    simulation.run();
  });
}
