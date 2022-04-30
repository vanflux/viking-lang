import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { tinycLexer as Lexer } from './antlr/tinycLexer';
import { tinycParser as Parser } from './antlr/tinycParser';
import { Ast } from './ast';
import { CodeGen } from './codegen';

// Making compiler
// https://tomassetti.me/parse-tree-abstract-syntax-tree/

export class Compiler {
  compile(code: string) {
    const inputStream = CharStreams.fromString(code);
    const lexer = new Lexer(inputStream);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);
    
    const parseTre = parser.program();
    const ast = new Ast(parseTre);

    const codeGen = new CodeGen(ast);
    return codeGen.code.join('\n') + '\n';
  }
}
