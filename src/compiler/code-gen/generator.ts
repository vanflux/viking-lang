export class Generator {
  public code: string[] = [];

  genInit() {
    this.code.push('main');
    this.code.push('mov r6, r7'); // Base Stack Pointer = Current Stack Pointer
  }

  genEnd() {
    this.code.push('hcf');
  }

  genStackToRegMov(wpos: number, destReg: string) {
    if (wpos == 0) {
      this.code.push(`ldw ${destReg}, r6`); // Load stack value to destReg
    } else {
      this.code.push('mov r5, r6'); // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`); // Adjust TEMPORARY POINTER
      this.code.push(`ldw ${destReg}, r5`); // Load stack value to destReg
    }
  }

  genRegToStackMov(wpos: number, reg: string) {
    if (wpos == 0) {
      this.code.push(`stw ${reg}, r6`); // Save srcReg value on stack
    } else {
      this.code.push('mov r5, r6'); // Load Base Stack Pointer to TEMPORARY POINTER
      this.code.push(`sub r5, ${wpos}`); // Adjust TEMPORARY POINTER
      this.code.push(`stw ${reg}, r5`); // Save srcReg value on stack
    }
  }

  genLitToRegMov(literal: number, reg: string) {
    if (literal >= 128 && literal <= 255) {
      this.code.push(`ldc ${reg}, 0`);
      this.code.push(`ldc ${reg}, ${literal}`);
    } else {
      this.code.push(`ldi ${reg}, ${literal}`);
    }
  }

  genRegToRegMov(src: string, dest: string) {
    this.code.push(`mov ${dest}, ${src}`);
  }

  genRegToRegComputation(operation: string, src1: string, src2: string, dest: string) {
    switch (operation) {
      case '+': return this.code.push(`add ${dest}, ${src1}, ${src2}`);
      case '-': return this.code.push(`sub ${dest}, ${src1}, ${src2}`);
      case '<': return this.code.push(`slt ${dest}, ${src1}, ${src2}`);
      case '>': return this.code.push(`slt ${dest}, ${src2}, ${src1}`);
    }
    throw new Error('Unsupported reg reg computation operation');
  }

  genRegLitComputation(operation: string, literal: number, dest: string) {
    switch (operation) {
      case '+': return this.code.push(`add ${dest}, ${literal}`);
      case '-': return this.code.push(`sub ${dest}, ${literal}`);
      case '<': return this.code.push(`slt ${dest}, ${literal}`);
      case '>': return this.code.push(...[`slt ${dest}, ${literal+1}`, `xor ${dest}, 1`]);
    }
    throw new Error('Unsupported reg lit computation operation');
  }

  genRegNegate(reg: string) {
    this.code.push(`neg ${reg}`);
  }

  genJmpIfRegIsNotZero(reg: string, symbol: string) {
    this.code.push(`bnz ${reg}, ${symbol}`);
  }

  genJmpIfRegIsZero(reg: string, symbol: string) {
    this.code.push(`bez ${reg}, ${symbol}`);
  }

  genJmp(symbol: string) {
    this.code.push(`bnz r7, ${symbol}`);
  }

  genSymbol(symbolName: string) {
    this.code.push(`${symbolName}`);
  }

  genPrintChar(reg: string) {
    this.code.push(`stw ${reg}, 0xf000`);
  }

  genPrintNumber(reg: string) {
    this.code.push(`stw ${reg}, 0xf002`);
  }

  genComment(comment: string) {
    this.code.push(`// ${comment}`);
  }
}
