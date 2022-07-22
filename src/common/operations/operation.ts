import { Simulation } from '../../simulator';

export type Operation = BasicOperation | PseudoOperation;

export abstract class BasicOperation {
  abstract getName(): string;
  abstract getOpcode(): number;
  isPseudo() {
    return false;
  }
  abstract supportR(): boolean;
  abstract supportI(): boolean;
  abstract executeR(simulation: Simulation, rst: string, rsa: string, rsb: string): void;
  abstract executeI(simulation: Simulation, rst: string, immediate: number): void;
}

export abstract class PseudoOperation {
  abstract getName(): string;
  isPseudo() {
    return true;
  }
}
