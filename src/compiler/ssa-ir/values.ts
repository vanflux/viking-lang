
export abstract class SSAValue {
  public __base = 'ssa_value';
  public abstract toString(): string;
  
  constructor(public type: string) {}
}

export class SSAVariable extends SSAValue {
  public register?: string;
  public stackPos?: number;

  constructor(public base: string, public version: number, type: string) {super(type)}

  public next() {
    return new SSAVariable(this.base, this.version + 1, this.type)
  }

  public toString(): string {
    return `${this.base}${this.version}`;
  }
}

export class SSALiteralNumberValue extends SSAValue {
  constructor(public value: number, type: string) {super(type)}

  public toString(): string {
    return `${this.value}`;
  }
}

export class SSALiteralStringValue extends SSAValue {
  constructor(public value: string, ) {super('string')}
  
  public toString(): string {
    return `"${this.value}"`;
  }
}
