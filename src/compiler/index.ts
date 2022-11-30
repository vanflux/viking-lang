import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Architecture } from '../common';
import { Ast } from './ast-ir';
import { ICodeGen } from './code-gen';
import { Lexer, Parser } from './lex-parser';

// Making compiler
// https://tomassetti.me/parse-tree-abstract-syntax-tree/

export * from './ast-ir';
export * from './code-gen';
export * from './lex-parser';
export * from './register-allocator';
export * from './ssa-ir';

export interface CompilerResult {
  code: string;
}

export class Compiler {
  public constructor(private architecture: Architecture, private codeGen: ICodeGen) {}

  public compile(code: string): CompilerResult {
    const inputStream = CharStreams.fromString(code);
    const lexer = new Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);
    const parseTree = parser.entry();
    const astIr = new Ast(parseTree);
    const generatedCode = this.codeGen.generate(astIr);
    return { code: generatedCode };
  }
}

