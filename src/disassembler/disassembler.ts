import { Architecture } from '../common/architecture';
import { Instruction } from '../common/instruction';

class Disassembler {
    private architecture: Architecture;

    constructor(architecture: Architecture) {
        this.architecture = architecture;
    }

    disassemble(rawHex: string) {
        if (rawHex.length === 0) return [];

        let result = [];
        let arrayLiteral = rawHex
            .match(/.{1,4}/g)
            ?.map(x => parseInt(x, 16));
        
        if (!arrayLiteral) return [];
        
        let pc = 0;
        for (let code of arrayLiteral) {
            let instruction;
            try {
                instruction = Instruction.disassemble(code, this.architecture);
            } catch (exc) { }

            let value = instruction ? instruction.toString() : '????';

            result.push({
                instruction,
                value,
                pc,
                code,
            });

            pc += 2;
        }

        return result;
    }
}

export default Disassembler;