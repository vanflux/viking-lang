import { EntryContext } from "../lex-parser";
import { ASTStatement, externalStmtToAst } from "./statements";

export type ASTProcessFunc<T = void> = (node: ASTNode, ctx?: T) => T;

export interface ASTNode {
  text: string;
  process<T>(func: ASTProcessFunc<T>, ctx?: T): void;
}

export class Ast {
  externalStatements: ASTStatement[];

  constructor(entryContext: EntryContext) {
    function programToAst(ctx: EntryContext) {
      return ctx.externalStmt().flatMap(externalStmtToAst);
    }

    this.externalStatements = programToAst(entryContext);
  }

  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    this.externalStatements.forEach(x => x.process(func, ctx));
  }
}
