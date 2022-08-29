import { SSAInstruction } from "./instructions";
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
  constructor(public id: string) {}
  
  public setArgs(args: SSABlockArgument[]) {
    this.args = args;
    return this;
  }

  public addInstruction(instruction: SSAInstruction) {
    this.instructions.push(instruction);
    return this;
  }

  public toString() {
    return `${this.id}(${this.args.map(x => x.toString()).join(', ')}):\n${this.instructions.map(x => x.toString()).join('\n')}`;
  }
}

export class SSABlockGenerationContext {
  public blocks: SSABlock[] = [];
  public variables: SSAVariable[] = [];
  
  constructor(public id: string) {}

  public curBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public addBlock() {
    const block = new SSABlock(`${this.id}_${this.blocks.length}`);
    this.blocks.push(block);
    return block;
  }

  public getVar(id: string, isNew: boolean) {
    const variable = this.variables.find(x => x.base === id);
    if (variable) {
      if (isNew) {
        const newVariable = variable.next();
        this.variables.unshift(newVariable);
        return newVariable;
      }
      return variable;
    } else {
      const newVariable = new SSAVariable(id, 0);
      this.variables.unshift(newVariable);
      return newVariable;

    }
  }

  public getTmp(isNew: boolean) {
    return this.getVar('_T', isNew);
  }
}
