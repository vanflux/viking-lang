import { Architecture, Instruction, Operand, signedNumberToHex } from '../common';
import { CommentParser } from './commentParser';
import { DataParser } from './dataParser';
import { InstructionParser } from './instructionParser';
import { LineParser, LineParseResult } from './lineParser';
import { PseudoConverter } from './pseudoConverter';

export interface AdditionalAssembleInfo {
  lineNumber: number;
  line: string;
  pc: number;
  parsed?: LineParseResult;
}

export interface AssemblerResult {
  rawObjectCode?: string;
  objectCodeArray: number[];
  symbolTable: { [name: string]: number };
  instructions: Instruction[];
  additionalInfos: AdditionalAssembleInfo[];
}

export class Assembler {
  private programData!: string;
  private extraSymbolTable: { [name: string]: number } = {};
  private lines!: string[];
  private sequence!: (number | Instruction)[];
  private symbolTable!: { [name: string]: number };
  private objectCodeArray!: number[];
  private instructions!: Instruction[];
  private additionalInfos!: AdditionalAssembleInfo[];
  private rawObjectCode?: string;

  public constructor(private architecture: Architecture, private pseudoConverter: PseudoConverter) {}

  public assemble(programData: string): AssemblerResult {
    this.programData = programData;
    this.lines = this.programData.split('\n');
    this.sequence = [];
    this.symbolTable = {};
    this.objectCodeArray = [];
    this.instructions = [];
    this.additionalInfos = [];

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

  public addExtraSymbolTable(symbolTable: { [name: string]: number }) {
    Object.assign(this.extraSymbolTable, symbolTable);
  }

  // Process instructions, pseudo-instructions, symbols.
  // Doesnt substitute symbols in instructions.
  private pass1() {
    let pc = 0;

    let instructionParser = new InstructionParser(this.architecture);
    let dataParser = new DataParser(this.architecture);
    let commentParser = new CommentParser();
    let lineParser = new LineParser(instructionParser, dataParser, commentParser);

    for (let i = 0; i < this.lines.length; i++) {
      let line = this.lines[i];
      let additionalInfo: AdditionalAssembleInfo = { lineNumber: i + 1, line, pc };
      this.additionalInfos.push(additionalInfo);

      let parsed!: LineParseResult;
      try {
        parsed = lineParser.parse(line);
      } catch (exc) {
        if (exc instanceof Error) {
          console.error(exc);
          throw new Error('Cant parse line ' + (i + 1) + ' "' + line.trim() + '": ' + exc.message);
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
            throw new Error('The pseudo instruction on line ' + (i + 1) + ' "' + line.trim() + '" doesnt exist');
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
  private pass2() {
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
            finalValue |= (symbolValue >> (this.architecture.getBitWidth() - 8 * (i + 1))) & 0xff;
          }
          operand.setType(Operand.LITERAL);
          operand.setValue(finalValue);
        }
      }
    }
  }

  // Assemble object code
  private pass3() {
    // Assemble
    for (let item of this.sequence) {
      if (typeof item === 'number') {
        this.objectCodeArray.push(item);
      } else {
        this.objectCodeArray.push(item.assemble(this.architecture));
      }
    }

    this.rawObjectCode = this.objectCodeArray.map(x => signedNumberToHex(x, 2)).join('');
  }
}
