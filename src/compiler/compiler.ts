import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { Architecture } from '../common';
import { vikingLexer as Lexer } from './antlr/vikingLexer';
import { vikingParser as Parser } from './antlr/vikingParser';
import { Ast } from './ast';
import { CodeGen } from './code-gen';

// Making compiler
// https://tomassetti.me/parse-tree-abstract-syntax-tree/

export interface CompilerResult {
  code: string;
  ast: Ast;
}

export class Compiler {
  public constructor(
    private architecture: Architecture,
  ) {}

  public compile(code: string): CompilerResult {
    const inputStream = CharStreams.fromString(code);
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
    };
  }
}
