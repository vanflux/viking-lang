import { EventEmitter } from 'events';
import { Architecture, ArchitectureRegister } from '../architecture';
import utils from '../utils';

export interface Register {
    baseName: string;
    value: number;
}

export class RegisterBank extends EventEmitter {

    static createFromArchitecture (architecture: Architecture) {
        let archRegisters = architecture.getRegisters();
        return new RegisterBank(archRegisters, architecture.getByteWidth());
    }

    private registerByteWidth: number;
    private mask: number;
    private registerByName: {[registerName: string]: Register};

    constructor (registerInfos: ArchitectureRegister[], registerByteWidth: number) {
        super();
        this.registerByteWidth = registerByteWidth;

        this.mask = Math.pow(2, 8 * this.registerByteWidth) - 1;

        this.registerByName = {};
        for (let { name, aliases } of registerInfos) {
            const register = {baseName: name, value: 0};
            
            this.registerByName[name] = register;
            aliases.forEach(aliasName => this.registerByName[aliasName] = register);
        }
    }

    reset() {
        for (let registerName in this.registerByName) {
            this.setValue(registerName, 0);
        }
    }

    setValue(registerName: string, newValue: number) {
        newValue = (newValue & this.mask) >>> 0;
        let register = this.registerByName[registerName];
        let oldValue = register.value;
        register.value = newValue;
        this.emit('value update', { registerName: register.baseName, oldValue, newValue });
    }

    getValue(registerName: string) {
        return utils.unsignedToSigned(this.registerByName[registerName].value, this.registerByteWidth);
    }
    
    getUValue(registerName: string) {
        return this.registerByName[registerName].value;
    }

    print() {
        for (let registerName in this.registerByName) {
            console.log(registerName + ':', this.registerByName[registerName].value.toString(16).padStart(4, '0'));
        }
    }
}