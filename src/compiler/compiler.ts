import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { inspect } from 'util';
import { Architecture } from '../common';
import { Ast } from './ast-ir';
import { CodeGen } from './code-gen';
import { Lexer, Parser } from './lex-parser';
import { LinearScan } from './register-allocator';
import { SSA } from './ssa-ir';

// Making compiler
// https://tomassetti.me/parse-tree-abstract-syntax-tree/

export interface CompilerResult {
  code: string;
}

export class Compiler {
  public constructor(private architecture: Architecture) {}

  public compile(code: string): CompilerResult {
    const inputStream = CharStreams.fromString(code);
    const lexer = new Lexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);
    const parseTree = parser.entry();
    const astIr = new Ast(parseTree);
    const ssaIr = new SSA(astIr);
    //console.log(ssaIr.toString())

    const registerAllocator = new LinearScan();
    registerAllocator.process(ssaIr, {
      registerCount: 4,
    });
    
    return {code: ''};
    /*const inputStream = CharStreams.fromString(code);
    const lexer = new Lexer(inputStream);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);

    const parseTree = parser.entry();
    const ast = new Ast(parseTree);

    const codeGen = new CodeGen(this.architecture, ast);
    const outCode = codeGen.gen.code.join('\n') + '\n';

    return {
      code: outCode,
      ast,
    };*/
  }
}
