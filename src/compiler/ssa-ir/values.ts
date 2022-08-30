
export abstract class SSAValue {
  public __base = 'ssa_value';
  public abstract toString(): string;
}

export class SSAVariable extends SSAValue {
  constructor(public base: string, public version: number) {super()}

  public next() {
    return new SSAVariable(this.base, this.version + 1)
  }

  public toString(): string {
    return `${this.base}${this.version}`;
  }
}

export class SSARegister extends SSAValue {
  constructor(public register: number) {super()}

  public toString(): string {
    return `r${this.register}`;
  }
}

export class SSALiteralNumberValue extends SSAValue {
  constructor(public value: number) {super()}

  public toString(): string {
    return `${this.value}`;
  }
}

export class SSALiteralStringValue extends SSAValue {
  constructor(public value: string) {super()}
  
  public toString(): string {
    return `"${this.value}"`;
  }
}
