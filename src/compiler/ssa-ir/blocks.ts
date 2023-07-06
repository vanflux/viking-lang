import { SSABranchInstruction, SSAInstruction } from "./instructions";
import { SSAVariable } from "./values";

export class SSABlockArgument {
  constructor(public variable: SSAVariable) {};

  public toString() {
    return `${this.variable.type} ${this.variable.toString()}`;
  }
}

export class SSABlock {
  public instructions: SSAInstruction[] = [];
  public args: SSABlockArgument[] = [];
  public variables: SSAVariable[] = [];
  public argsChangeHandlers: ((addedArg: SSABlockArgument)=>any)[] = [];
  public id: string;

  constructor(public name: string, public seq: number, public prev: SSABlock | undefined) {
    this.id = `${name}_${seq}`;
  }
  
  public setArgs(args: SSABlockArgument[]) {
    args.forEach(arg => this.addArg(arg));
    return this;
  }

  public addArg(arg: SSABlockArgument) {
    if (this.args.find(x => x.variable.base === arg.variable.base)) return;
    this.args.push(arg);
    this.variables.unshift(arg.variable);
    this.argsChangeHandlers.forEach(x => x(arg));
    return this;
  }

  public registerArgsChangeHandler(handler: (addedArg: SSABlockArgument) => any) {
    this.argsChangeHandlers.push(handler);
  }

  public addInstruction(instruction: SSAInstruction) {
    this.instructions.push(instruction);
    if (instruction instanceof SSABranchInstruction) instruction.setBlock(this);
    return this;
  }

  public hasVar(id: string) {
    if (this.variables.find(x => x.base === id)) return true;
    if (this.prev?.hasVar(id)) return true;
    return false;
  }

  public getVar(id: string, isNew: boolean, isTemp=false): SSAVariable {
    const variable = this.variables.find(x => x.base === id);
    if (!variable) {
      // Search variables on previous blocks
      if (!isTemp && this.prev?.hasVar(id)) {
        const variable = this.prev.getVar(id, false, isTemp);
        if (variable) {
          const newVariable = new SSAVariable(id, 0, 'int');
          this.addArg(new SSABlockArgument(newVariable));
          return newVariable;
        }
      }
      const newVariable = new SSAVariable(id, 0, 'int');
      this.variables.unshift(newVariable);
      return newVariable;
    } else {
      if (isNew) {
        const newVariable = variable.next();
        this.variables.unshift(newVariable);
        return newVariable;
      } else {
        return variable;
      }
    }
  }

  public getTmp(isNew: boolean) {
    return this.getVar('_T', isNew, true);
  }

  public toString() {
    return `${this.id}(${this.args.map(x => x.toString()).join(', ')}):\n${this.instructions.map(x => x.toString()).join('\n')}`;
  }
}

export class SSABlockGenerationContext {
  constructor(public name: string, public blocks: SSABlock[] = []) {}

  public curBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public addBlock() {
    const block = new SSABlock(this.name, this.blocks.length, this.curBlock());
    this.blocks.push(block);
    return block;
  }
}
