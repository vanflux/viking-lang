import { IRegisterAllocator, RegisterAllocatorOptions } from ".";
import { SSA } from "../ssa-ir";
import { SSABlock } from "../ssa-ir/blocks";

export type LSAllocation = { type: 'register', register: string } | { type: 'stack' };

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
  public process(ssa: SSA, options: RegisterAllocatorOptions): void {
    const block = ssa.blocks[0];
    console.log(block.toString());
    const liveRanges = this.buildLiveRanges(block);
    console.log(liveRanges.toString());
    const allocations = this.allocate(liveRanges, options.registerCount);
    console.log('ssa.blocks', ssa.blocks.map(x => x.toString()).join('\n\n'));
    console.log('allocations', allocations);
  }

  private buildLiveRanges(block: SSABlock) {
    const liveRanges = new LiveRanges();
    for (let i = 0; i < block.instructions.length; i++) {
      const instruction = block.instructions[i];
      for (const variable of instruction.variables()) {
        liveRanges.informUsage(i, variable.toString());
      }
    }
    return liveRanges;
  }

  private allocate(liveRanges: LiveRanges, registerCount: number) {
    const availableRegisters = new Array(registerCount).fill(undefined).map((_, i) => `r${i}`);
    let stackPos = 0;
    const varAllocation = new Map<string, LSAllocation>();
    for (let i = 0; i < liveRanges.getSize(); i++) {
      for (const variable of liveRanges.getVariables()) {
        if (liveRanges.isEnd(variable, i)) {
          const allocation = varAllocation.get(variable);
          if (allocation?.type === 'register') {
            availableRegisters.unshift(allocation.register);
          }
        }
      }
      for (const variable of liveRanges.getVariables()) {
        if (liveRanges.isStart(variable, i)) {
          if (!liveRanges.isEnd(variable, i)) {
            if (availableRegisters.length === 0) {
              varAllocation.set(variable, { type: 'stack' });
              stackPos += 2;
            } else {
              const register = availableRegisters.shift()!;
              varAllocation.set(variable, { type: 'register', register });
            }
          }
        }
      }
    }
    return varAllocation;
  }
}
