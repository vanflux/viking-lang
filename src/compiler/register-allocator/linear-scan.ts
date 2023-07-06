import { Allocation, IRegisterAllocator, RegisterAllocatorOptions } from ".";
import { SSA } from "../ssa-ir";
import { SSABlock } from "../ssa-ir/blocks";
import { SSABranchGoInstruction, SSABranchInstruction, SSABranchNZInstruction } from "../ssa-ir/instructions";
import { SSAVariable } from "../ssa-ir/values";

export class LiveRanges {
  private starts = new Map<SSAVariable, number>();
  private ends = new Map<SSAVariable, number>();
  private size = 0;
  
  public getSize() {
    return this.size;
  }

  public informUsage(index: number, variable: SSAVariable) {
    if (!this.starts.has(variable)) this.starts.set(variable, index);
    this.ends.set(variable, index);
    this.size = Math.max(this.size, index + 1);
  }

  public getVariables() {
    return this.starts.keys();
  }

  public isStart(variable: SSAVariable, index: number) {
    return this.starts.get(variable)! === index;
  }

  public isEnd(variable: SSAVariable, index: number) {
    return this.ends.get(variable)! === index;
  }

  public toString() {
    return [...this.starts.entries()].map(([varName, index]) => `${varName}: ${index}-${this.ends.get(varName)}`).join('\n');
  }
}

export class LinearScan implements IRegisterAllocator {
  public processedSsaBlocks = new Set<SSABlock>();
  private busyStackPositions = new Set<number>();
  private registerCount = 0;

  public process(ssa: SSA, options: RegisterAllocatorOptions): void {
    this.registerCount = options.registerCount;
    for (const block of ssa.allBlocks) {
      if (this.processedSsaBlocks.has(block)) continue;
      this.allocate(block);
    }
  }

  private allocate(block: SSABlock, argAllocations?: Allocation[]) {
    if (this.processedSsaBlocks.has(block)) return;
    this.processedSsaBlocks.add(block);

    const availableRegisters: string[] = [];
    for (let i = 0; i < this.registerCount; i++) availableRegisters.push(`r${i + 1}`);

    const dealloc = (allocation: Allocation) => {
      if (allocation.type === 'register') {
        availableRegisters.unshift(allocation.register);
      } else {
        this.busyStackPositions.delete(allocation.stackPos);
      }
    }
  
    const alloc = (): Allocation => {
      if (availableRegisters.length === 0) {
        let stackPos = 0;
        while (this.busyStackPositions.has(stackPos)) stackPos += 2;
        this.busyStackPositions.add(stackPos);
        return { type: 'stack', stackPos };
      } else {
        const register = availableRegisters.shift()!;
        return { type: 'register', register };
      }
    }

    const allocations = new Map<SSAVariable, Allocation>();
    const liveRanges = new LiveRanges();
    for (let i = 0; i < block.args.length; i++) {
      const arg = block.args[i];
      const argAllocation = argAllocations?.[i];
      const allocation =  argAllocation ?? alloc();
      if (allocation?.type === 'register') {
        if (argAllocation) availableRegisters.splice(availableRegisters.indexOf(allocation.register), 1);
        arg.variable.register = allocation.register;
      } else if (allocation?.type === 'stack') {
        arg.variable.stackPos = allocation.stackPos;
      }
      liveRanges.informUsage(0, arg.variable);
      allocations.set(arg.variable, allocation);
    }
    for (let i = 0; i < block.instructions.length; i++) {
      const instruction = block.instructions[i];
      for (const variable of instruction.variables()) {
        liveRanges.informUsage(i, variable);
      }
    }

    for (let i = 0; i < block.instructions.length; i++) {
      const instruction = block.instructions[i];
      if (instruction instanceof SSABranchInstruction) {
        if (instruction instanceof SSABranchGoInstruction) {
          const argAllocations = instruction.params.map(param => allocations.get(param)!);
          this.allocate(instruction.dest, argAllocations);
        } else if (instruction instanceof SSABranchNZInstruction) {
          const trueArgAllocations = instruction.paramsTrue.map(param => allocations.get(param)!);
          this.allocate(instruction.destTrue, trueArgAllocations);
          const falseArgAllocations = instruction.paramsFalse.map(param => allocations.get(param)!);
          this.allocate(instruction.destFalse, falseArgAllocations);
        }
      }
      for (const variable of liveRanges.getVariables()) {
        if (liveRanges.isEnd(variable, i)) {
          if (allocations.get(variable)) {
            const allocation = allocations.get(variable)!;
            dealloc(allocation);
          }
        }
      }
      for (const variable of liveRanges.getVariables()) {
        if (liveRanges.isStart(variable, i)) {
          if (!liveRanges.isEnd(variable, i)) {
            if (!allocations.get(variable)) {
              const allocation = alloc();
              const v = block.variables.find(v => v === variable);
              if (v) {
                v.register = allocation.type === 'register' ? allocation.register : undefined;
                v.stackPos = allocation.type === 'stack' ? allocation.stackPos : undefined;
              }
              allocations.set(variable, allocation);
            }
          }
        }
      }
    }
  }
}
