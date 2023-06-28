import { SSA } from "../ssa-ir";

export interface RegisterAllocatorOptions {
  registerCount: number;
}

export interface IRegisterAllocator {
  process(ssa: SSA, options: RegisterAllocatorOptions): void;
}

export type Allocation = { type: 'register', register: string } | { type: 'stack', stackPos: number };

export * from './linear-scan';
