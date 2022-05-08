import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { vikingLexer as Lexer } from './antlr/vikingLexer';
import { vikingParser as Parser } from './antlr/vikingParser';
import { Ast } from './ast';
import { CodeGen } from './code-gen/code-gen';

// Making compiler
// https://tomassetti.me/parse-tree-abstract-syntax-tree/

export class Compiler {
  compile(code: string) {
    const inputStream = CharStreams.fromString(code);
    const lexer = new Lexer(inputStream);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new Parser(tokenStream);

    const parseTree = parser.entry();
    const ast = new Ast(parseTree);

    const codeGen = new CodeGen(ast);
    return codeGen.gen.code.join('\n') + '\n';
  }
}
