import utils from '../utils';
import { Architecture } from '../architecture';
import { PseudoConverter } from './pseudoConverter';
import { Instruction } from '../instruction';
import { InstructionParser } from './instructionParser';
import { DataParser } from './dataParser';
import { CommentParser } from './commentParser';
import { LineParser, LineParseResult } from './lineParser';
import { Operand } from '../operand';

export interface AdditionalAssembleInfo {
    lineNumber: number;
    line: string;
    pc: number;
    parsed?: LineParseResult;
}

class Assembler {
    private architecture: Architecture;
    private programData: string;
    private pseudoConverter: PseudoConverter;
    private extraSymbolTable: {[name: string]: number};
    private lines: string[];
    private sequence: (number | Instruction)[];
    private symbolTable: {[name: string]: number};
    private objectCodeArray: number[];
    private instructions: Instruction[];
    private additionalInfos: AdditionalAssembleInfo[];
    private rawObjectCode?: string;

    constructor(architecture: Architecture, programData: string, pseudoConverter: PseudoConverter) {
        this.architecture = architecture;
        this.programData = programData;
        this.pseudoConverter = pseudoConverter;
        this.extraSymbolTable = {};
        
        this.lines = this.programData.split('\n');
        
        this.sequence = [];
        this.symbolTable = {};
        this.objectCodeArray = [];
        this.instructions = [];
        this.additionalInfos = [];
    }

    assemble() {
        this.pass1();
        this.pass2();
        this.pass3();
        
        return {
            rawObjectCode: this.rawObjectCode,
            objectCodeArray: this.objectCodeArray,
            symbolTable: this.symbolTable,
            instructions: this.instructions,
            additionalInfos: this.additionalInfos,
        };
    }

    addExtraSymbolTable(symbolTable: {[name: string]: number}) {
        Object.assign(this.extraSymbolTable, symbolTable);
    }

    // Process instructions, pseudo-instructions, symbols.
    // Doesnt substitute symbols in instructions.
    pass1() {
        let pc = 0;

        let instructionParser = new InstructionParser(this.architecture);
        let dataParser = new DataParser(this.architecture);
        let commentParser = new CommentParser();
        let lineParser = new LineParser(instructionParser, dataParser, commentParser);

        for (let i = 0; i < this.lines.length; i++) {
            let line = this.lines[i];
            let additionalInfo: AdditionalAssembleInfo = { lineNumber: i+1, line, pc };
            this.additionalInfos.push(additionalInfo);

            let parsed!: LineParseResult;
            try {
                parsed = lineParser.parse(line);
            } catch (exc) {
                if (exc instanceof Error) {
                    console.error(exc);
                    throw new Error('Cant parse line ' + (i+1) + ' "' + line.trim() + '": ' + exc.message);
                }
            }
            let { symbol, instruction, data } = parsed;
            additionalInfo.parsed = parsed;

            if (symbol) {
                this.symbolTable[symbol] = pc;
            }
            if (data) {
                this.sequence.push(...data);
                pc += 2 * data.length;
            }
            if (instruction) {
                // process pseudo instructions
                if (instruction.isPseudo()) {
                    let convInstructions = this.pseudoConverter.convert(instruction, this.architecture);
                    if (convInstructions != null && convInstructions.length > 0) {
                        this.instructions.push(...convInstructions);
                        this.sequence.push(...convInstructions);
                        pc += 2 * convInstructions.length;
                    } else {
                        throw new Error('The pseudo instruction on line ' + (i+1) + ' "' + line.trim() + '" doesnt exist');
                    }
                } else {
                    this.instructions.push(instruction);
                    this.sequence.push(instruction);
                    pc += 2;
                }
            }
        }
    }

    // Substitute symbols with their values
    pass2() {
        for (let instruction of this.instructions) {
            let operands = instruction.getOperands();
            for (let operand of operands) {
                if (operand.getType() === Operand.SYMBOL) {
                    let symbolValue = this.symbolTable[operand.getValue()];
                    if (symbolValue == null) symbolValue = this.extraSymbolTable[operand.getValue()];
                    if (symbolValue == null) throw new Error('The symbol "' + operand.getValue() + '" doesnt exist');
                    let finalValue = 0;
                    const byteRange = operand.getByteRange();
                    if (!byteRange) throw new Error('Pass2 Byte range undefined');
                    for (let i = byteRange.min; i <= byteRange.max; i++) {
                        finalValue <<= 2;
                        finalValue |= (symbolValue >> (this.architecture.getBitWidth() - (8 * (i + 1)))) & 0xFF;
                    }
                    operand.setType(Operand.LITERAL);
                    operand.setValue(finalValue);
                }
            }
        }
    }

    // Assemble object code
    pass3() {
        // Assemble
        for (let item of this.sequence) {     
            if (typeof item === 'number') {
                this.objectCodeArray.push(item);
            } else {
                this.objectCodeArray.push(item.assemble(this.architecture));
            }
        }
        
        this.rawObjectCode = this.objectCodeArray
            .map(x => utils.signedNumberToHex(x, 2))
            .join('');
    }
};

export default Assembler;