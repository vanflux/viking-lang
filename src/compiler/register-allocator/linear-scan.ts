import { Allocation, IRegisterAllocator, RegisterAllocatorOptions } from ".";
import { SSA } from "../ssa-ir";
import { SSABlock } from "../ssa-ir/blocks";
import { SSABranchGoInstruction, SSABranchInstruction, SSABranchNZInstruction } from "../ssa-ir/instructions";

export class LiveRanges {
  private starts = new Map<string, number>();
  private ends = new Map<string, number>();
  private size = 0;
  
  public getSize() {
    return this.size;
  }

  public informUsage(index: number, varName: string) {
    if (!this.starts.has(varName)) this.starts.set(varName, index);
    this.ends.set(varName, index);
    this.size = Math.max(this.size, index + 1);
  }

  public getVariables() {
    return this.starts.keys();
  }

  public isStart(varBaseName: string, index: number) {
    return this.starts.get(varBaseName)! === index;
  }

  public isEnd(varBaseName: string, index: number) {
    return this.ends.get(varBaseName)! === index;
  }

  public toString() {
    return [...this.starts.entries()].map(([varName, index]) => `${varName}: ${index}-${this.ends.get(varName)}`).join('\n');
  }
}

export class LinearScan implements IRegisterAllocator {
  public ssaBlockAllocations = new Map<SSABlock, Map<string, Allocation>>();
  private busyStackPositions = new Set<number>();
  private registerCount = 0;

  public process(ssa: SSA, options: RegisterAllocatorOptions): void {
    this.registerCount = options.registerCount;
    const entryBlock = ssa.blocks[0];
    this.allocate(entryBlock);
  }

  private allocate(block: SSABlock, argAllocations?: Allocation[]) {
    if (this.ssaBlockAllocations.has(block)) return;

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

    const allocations = new Map<string, Allocation>();
    this.ssaBlockAllocations.set(block, allocations);
    
    const liveRanges = new LiveRanges();
    for (let i = 0; i < block.args.length; i++) {
      const arg = block.args[i];
      const argAllocation = argAllocations?.[i];
      if (argAllocation && argAllocation.type === 'register') {
        availableRegisters.splice(availableRegisters.indexOf(argAllocation.register), 1);
      }
      const allocation =  argAllocation ?? alloc();
      const variable = `${arg.baseVarName}0`;
      liveRanges.informUsage(0, variable);
      allocations.set(variable, allocation);
    };
    for (let i = 0; i < block.instructions.length; i++) {
      const instruction = block.instructions[i];
      for (const variable of instruction.variables()) {
        liveRanges.informUsage(i, variable.toString());
      }
    }

    for (let i = 0; i < block.instructions.length; i++) {
      const instruction = block.instructions[i];
      if (instruction instanceof SSABranchInstruction) {
        if (instruction instanceof SSABranchGoInstruction) {
          const argAllocations = instruction.params.map(param => allocations.get(param.toString())!);
          this.allocate(instruction.dest, argAllocations);
        } else if (instruction instanceof SSABranchNZInstruction) {
          const trueArgAllocations = instruction.paramsTrue.map(param => allocations.get(param.toString())!);
          this.allocate(instruction.destTrue, trueArgAllocations);
          const falseArgAllocations = instruction.paramsFalse.map(param => allocations.get(param.toString())!);
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
              allocations.set(variable, allocation);
            }
          }
        }
      }
    };
  }
}
