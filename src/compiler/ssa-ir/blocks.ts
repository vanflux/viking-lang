import { SSABranchInstruction, SSAInstruction } from "./instructions";
import { SSAVariable } from "./values";

export class SSABlockArgument {
  constructor(public baseVarName: string, public type: string) {};

  public toString() {
    return `${this.type} ${this.baseVarName}?`;
  }
}

export class SSABlock {
  public instructions: SSAInstruction[] = [];
  public args: SSABlockArgument[] = [];
  public variables: SSAVariable[] = [];
  public argsChangeHandlers: ((addedArg: SSABlockArgument)=>any)[] = [];

  constructor(public id: string, public prev: SSABlock | undefined) {}
  
  public setArgs(args: SSABlockArgument[]) {
    args.forEach(arg => this.addArg(arg));
    return this;
  }

  public addArg(arg: SSABlockArgument) {
    if (this.args.find(x => x.baseVarName === arg.baseVarName)) return;
    this.args.push(arg);
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
    if (this.args.find(x => x.baseVarName === id)) return true;
    if (this.prev?.hasVar(id)) return true;
    return false;
  }

  public getVar(id: string, isNew: boolean, isTemp=false): SSAVariable {
    let newVariable = new SSAVariable(id, 0);
    const variable = this.variables.find(x => x.base === id);
    if (!variable) {
      // Search variables on previous blocks
      if (!isTemp && this.prev?.hasVar(id)) {
        const variable = this.prev.getVar(id, false, isTemp);
        if (variable) {
          this.addArg(new SSABlockArgument(id, 'int'));
          if (isNew) newVariable = newVariable.next();
        }
      }
    } else {
      newVariable = isNew ? variable.next() : variable;
    }
    this.variables.unshift(newVariable);
    return newVariable;
  }

  public getTmp(isNew: boolean) {
    return this.getVar('_T', isNew, true);
  }

  public toString() {
    return `${this.id}(${this.args.map(x => x.toString()).join(', ')}):\n${this.instructions.map(x => x.toString()).join('\n')}`;
  }
}

export class SSABlockGenerationContext {
  public blocks: SSABlock[] = [];
  
  constructor(public id: string) {}

  public curBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public addBlock() {
    const block = new SSABlock(`${this.id}_${this.blocks.length}`, this.curBlock());
    this.blocks.push(block);
    return block;
  }
}
