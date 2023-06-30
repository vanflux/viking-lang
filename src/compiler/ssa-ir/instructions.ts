import { SSABlock } from "./blocks";
import { SSAValue, SSAVariable } from "./values";

export abstract class SSAInstruction {
  public __base = 'ssa_instruction';
  
  public abstract variables(): SSAVariable[];
  public abstract toString(): string;
}

export abstract class SSABranchInstruction extends SSAInstruction {
  public abstract setBlock(block: SSABlock): SSABranchInstruction;
}

export class SSABranchGoInstruction extends SSABranchInstruction {
  constructor(public dest: SSABlock, public params: SSAVariable[]) {super()}

  setBlock(block: SSABlock) {
    this.dest.args.forEach(arg => this.params.push(block.getVar(arg.variable.base, false)));
    this.dest.registerArgsChangeHandler(arg => {
      this.params.push(block.getVar(arg.variable.base, false));
    });
    return this;
  }

  variables() {
    return this.params;
  }

  public toString(): string {
    return `BR.GO ${this.dest.id}(${this.params.map(x => x.toString()).join(', ')})`;
  }
}

export class SSABranchNZInstruction extends SSABranchInstruction {
  constructor(public input: SSAVariable, public destTrue: SSABlock, public paramsTrue: SSAVariable[], public destFalse: SSABlock, public paramsFalse: SSAVariable[]) {super()}

  setBlock(block: SSABlock) {
    this.destTrue.args.forEach(arg => this.paramsTrue.push(block.getVar(arg.variable.base, false)));
    this.destFalse.args.forEach(arg => this.paramsFalse.push(block.getVar(arg.variable.base, false)));
    this.destTrue.registerArgsChangeHandler(arg => this.paramsTrue.push(block.getVar(arg.variable.base, false)));
    this.destFalse.registerArgsChangeHandler(arg => this.paramsFalse.push(block.getVar(arg.variable.base, false)));
    return this;
  }

  variables() {
    return [...(this.input instanceof SSAVariable ? [this.input] : []), ...this.paramsTrue, ...this.paramsFalse];
  }

  public toString(): string {
    const strTrue =  `${this.destTrue.id}(${this.paramsTrue.map(x => x.toString()).join(', ')})`;
    const strFalse = `${this.destFalse.id}(${this.paramsFalse.map(x => x.toString()).join(', ')})`;
    return `BR.NZ ${this.input.toString()} ${strTrue} ${strFalse}`;
  }
}

export class SSAMoveInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public input: SSAValue) {super()}
  
  variables() {
    return [this.dest, ...(this.input instanceof SSAVariable ? [this.input] : [])];
  }

  public toString(): string {
    return `${this.dest.toString()} = ${this.input.toString()}`;
  }
}

export class SSAUnaryInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public input: SSAValue, public operation: string) {super()}
  
  variables() {
    return [this.dest, ...(this.input instanceof SSAVariable ? [this.input] : [])];
  }

  public toString(): string {
    return `${this.dest.toString()} = ${this.operation} ${this.input.toString()}`;
  }
}

export class SSABinaryInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public left: SSAValue, public right: SSAValue, public operation: string) {super()}
  
  variables() {
    return [this.dest, ...(this.left instanceof SSAVariable ? [this.left] : []), ...(this.right instanceof SSAVariable ? [this.right] : [])];
  }

  public toString(): string {
    return `${this.dest.toString()} = ${this.left.toString()} ${this.operation} ${this.right.toString()}`;
  }
}

export class SSARetInstruction extends SSAInstruction {
  constructor(public retVar: SSAValue) {super()}
  
  variables() {
    return [...(this.retVar instanceof SSAVariable ? [this.retVar] : [])];
  }

  public toString(): string {
    return `RET ${this.retVar.toString()}`;
  }
}
