import { Instruction } from '../common/instruction';
import { CommentParser } from './commentParser';
import { DataParser } from './dataParser';
import { InstructionParser } from './instructionParser';

export interface LineParseResult {
  hasComment: boolean;
  comment?: string;
  symbol?: string;
  instruction?: Instruction;
  data?: number[];
}

export class LineParser {
  private instructionParser: InstructionParser;
  private dataParser: DataParser;
  private commentParser: CommentParser;

  constructor(instructionParser: InstructionParser, dataParser: DataParser, commentParser: CommentParser) {
    this.instructionParser = instructionParser;
    this.dataParser = dataParser;
    this.commentParser = commentParser;
  }

  getSymbolAndRest(str: string) {
    let symbol: string | undefined;
    let rest: string;

    let match = str.match(/^(\w*)[\t ]*(.*)/);
    if (Array.isArray(match) && match.length >= 3) {
      if (this.instructionParser.isOperationName(match[1])) {
        rest = match[1] + ' ' + match[2];
      } else {
        rest = match[2];
        if (match[1].length > 0) symbol = match[1];
      }
    } else {
      throw new Error('Cant parse line to symbol and rest');
    }

    return { symbol, rest };
  }

  parse(line: string): LineParseResult {
    // Extract symbols
    let { rest, symbol } = this.getSymbolAndRest(line);
    let lineRest1 = rest.trim();

    // Extract comments
    let { hasComment, comment, rest: commentRest } = this.commentParser.parse(lineRest1);
    let lineRest2 = commentRest?.trim();

    // Extract instructions / data
    let instruction: Instruction | undefined;
    let data: number[] | undefined;
    if (lineRest2?.length > 0) {
      if (this.instructionParser.isInstruction(lineRest2)) {
        instruction = this.instructionParser.parse(lineRest2);
      } else {
        data = this.dataParser.parse(lineRest2);
      }
    }

    return { hasComment, comment, symbol, instruction, data };
  }
}
