import { SSA } from "../ssa-ir";

export interface RegisterAllocatorOptions {
  registerCount: number;
}

export interface IRegisterAllocator {
  process(ssa: SSA, options: RegisterAllocatorOptions): void;
}

export * from './linear-scan';
