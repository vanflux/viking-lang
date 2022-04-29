export interface ArchitectureOptions {
    bitWidth: number;
    registers: ArchitectureRegister[];
    memoryRegions: ArchitectureMemoryRegions;
}

export interface ArchitectureRegister {
    name: string;
    code: number;
    aliases: string[];
}

export interface ArchitectureMemoryRegions {
    codeData: number;
    stack: number;
    io: number;
}

export class Architecture {
    private bitWidth: number;
    private byteWidth: number;
    private registers: ArchitectureRegister[];
    private memoryRegions: ArchitectureMemoryRegions;
    private mask: number;

    private registersByName: {[name: string]: ArchitectureRegister};
    private registersNameByCode: {[code: number]: string};

    constructor({ bitWidth, registers, memoryRegions }: ArchitectureOptions) {
        this.bitWidth = bitWidth;
        this.byteWidth = bitWidth / 8;
        this.registers = registers;
        this.memoryRegions = memoryRegions;
        this.mask = Math.pow(2, bitWidth) - 1;

        this.registersByName = Object.fromEntries(
            registers
            .map(register => [
                [
                    register.name,  // key      registerName
                    register,       // value    register
                ],
                ...register.aliases.map(aliasName => [
                        aliasName,  // key      registerName
                        register,   // value    register
                    ]
                )
            ])
            .reduce((a, b) => a.concat(b))
        );
        this.registersNameByCode = Object.fromEntries(
            registers
            .map(register => [
                [
                    register.code,  // key      registerName
                    register.name,  // value    register
                ],
            ])
            .reduce((a, b) => a.concat(b))
        );
    }

    getMask() {
        return this.mask;
    }

    getBitWidth() {
        return this.bitWidth;
    }

    getByteWidth() {
        return this.byteWidth;
    }

    hasRegisterName(name: string) {
        return this.registersByName[name] != null;
    }

    getRegisterNames() {
        return Object.keys(this.registersByName);
    }

    getRegisters() {
        return this.registers;
    }

    getRegisterNameByCode(code: number) {
        return this.registersNameByCode[code];
    }

    getRegisterCode(name: string) {
        if (!this.hasRegisterName(name)) throw new Error('Register doesnt exists');
        return this.registersByName[name].code;
    }

    getMemoryRegions() {
        return this.memoryRegions;
    }
}