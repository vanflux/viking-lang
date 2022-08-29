import { SSABlock } from "./blocks";
import { SSAValue, SSAVariable } from "./values";

export abstract class SSAInstruction {
  public __base = 'ssa_instruction';
  public abstract toString(): string;
}

export abstract class SSABranchInstruction extends SSAInstruction {}

export class SSABranchGoInstruction extends SSABranchInstruction {
  constructor(public dest: SSABlock, public params: SSAVariable[]) {super()}
  
  public toString(): string {
    return `BR.GO ${this.dest.id}(${this.params.map(x => x.toString()).join(', ')})`;
  }
}

export class SSABranchNZInstruction extends SSABranchInstruction {
  constructor(public input: SSAVariable, public destTrue: SSABlock, public paramsTrue: SSAVariable[], public destFalse: SSABlock, public paramsFalse: SSAVariable[]) {super()}
  
  public toString(): string {
    const strTrue =  `${this.destTrue.id}(${this.paramsTrue.map(x => x.toString()).join(', ')})`;
    const strFalse = `${this.destFalse.id}(${this.paramsFalse.map(x => x.toString()).join(', ')})`;
    return `BR.NZ ${this.input.toString()} ${strTrue} ${strFalse}`;
  }
}

export class SSAMoveInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public input: SSAValue) {super()}
  
  public toString(): string {
    return `${this.dest.toString()} = ${this.input.toString()}`;
  }
}

export class SSAUnaryInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public input: SSAValue, public operation: string) {super()}
  
  public toString(): string {
    return `${this.dest.toString()} = ${this.operation} ${this.input.toString()}`;
  }
}

export class SSABinaryInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public left: SSAValue, public right: SSAValue, public operation: string) {super()}
  
  public toString(): string {
    return `${this.dest.toString()} = ${this.left.toString()} ${this.operation} ${this.right.toString()}`;
  }
}

export class SSARetInstruction extends SSAInstruction {
  constructor(public retVar: SSAValue) {super()}
  
  public toString(): string {
    return `RET ${this.retVar.toString()}`;
  }
}
