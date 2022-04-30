export interface OperandByteRange {
    min: number;
    max: number;
}

export class Operand {
    static REGISTER = 'register';
    static SYMBOL = 'symbol';
    static LITERAL = 'literal';

    private value: any; // TODO: Type this correctly
    private type: string;
    private byteRange?: OperandByteRange;

    constructor(value: any, type: string) {
        this.value = value;
        this.type = type;
    }

    setByteRange(byteRange: OperandByteRange) {
        this.byteRange = byteRange;
        return this;
    }

    setValue(value: any) {
        this.value = value;
        return this;
    }
    
    setType(type: string) {
        this.type = type;
        return this;
    }

    getValue() {
        return this.value;
    }
    
    getType() {
        return this.type;
    }

    getByteRange() {
        return this.byteRange;
    }
}