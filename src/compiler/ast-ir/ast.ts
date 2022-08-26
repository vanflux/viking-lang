import {
  ArrayAccessExprContext,
  ArrayExprContext,
  AddExprContext,
  AssignExprContext,
  CallExprContext,
  EntryContext,
  ExprContext,
  NegExprContext,
  ParenExprContext,
  RelExprContext,
  StmtContext,
  StringExprContext,
  TermExprContext,
  ExternalStmtContext,
} from '../lex-parser';

type ProcessFunc<T = void> = (node: Node, ctx?: T) => T;

export interface Node {
  text: string;
  process<T>(func: ProcessFunc<T>, ctx?: T): void;
}
export interface Expression extends Node {}
export interface Statement extends Node {}

export interface FunctionArgument {
  type: string;
  id: string;
}

// Expressions

export class VarReference implements Expression {
  constructor(public text: string, public varName: string) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class NumberLiteralExpression implements Expression {
  constructor(public text: string, public value: number) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class StringLiteralExpression implements Expression {
  constructor(public text: string, public value: string) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ArrayLiteralExpression implements Expression {
  constructor(public text: string, public expressions: Expression[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ArrayAccessExpression implements Expression {
  constructor(public text: string, public array: Expression, public offset: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class NegateExpression implements Expression {
  constructor(public text: string, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class AssignExpression implements Expression {
  constructor(public text: string, public varRef: VarReference, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.varRef.process(func, ctx);
    this.expression.process(func, ctx);
  }
}

export class BinaryExpression implements Expression {
  constructor(public text: string, public operation: string, public leftExpression: Expression, public rightExpression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class RelationalExpression extends BinaryExpression {}
export class AddExpression extends BinaryExpression {}

export class CallExpression implements Expression {
  constructor(public text: string, public funcName: string, public paramExpressions: Expression[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.paramExpressions.forEach(x => x.process(func, ctx));
  }
}

// Statements

export class IfStatement implements Statement {
  constructor(
    public text: string,
    public conditionExpression: Expression,
    public ifStatements: Statement[],
    public elseStatements: Statement[]
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.ifStatements.forEach(x => x.process(func, ctx));
    this.elseStatements.forEach(x => x.process(func, ctx));
  }
}

export class WhileStatement implements Statement {
  constructor(public text: string, public conditionExpression: Expression, public statements: Statement[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.statements.forEach(x => x.process(func, ctx));
  }
}

export class ExpressionStatement implements Statement {
  constructor(public text: string, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class VarDeclarationStatement implements Statement {
  constructor(public text: string, public type: string, public id: string, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class FunctionDeclarationStatement implements Statement {
  constructor(public text: string, public type: string, public id: string, public args: FunctionArgument[], public stmts: Statement[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.stmts.forEach(x => x.process(func, ctx));
  }
}

export class ExternalStatement implements Statement {
  constructor(public text: string, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

// Ast

export class Ast {
  statements: Statement[];

  constructor(entryContext: EntryContext) {
    function programToAst(ctx: EntryContext) {
      return ctx.externalStmt().flatMap(externalStmtToAst);
    }

    function externalStmtToAst(ctx: ExternalStmtContext): Statement[] {
      if (ctx.fnDeclStmt()) {
        const types = ctx.fnDeclStmt()!.TYPE().map(x => x.text);
        const ids = ctx.fnDeclStmt()!.ID().map(x => x.text);
        const args = types.slice(1).map<FunctionArgument>((type, i) => ({ type, id: ids[i+1] }));
        const stmts = statementToAst(ctx.fnDeclStmt()!.stmt());
        return [new FunctionDeclarationStatement(ctx.text, types[0], ids[0], args, stmts)];
      } else if (ctx.varDeclStmt()) {
        const type = ctx.varDeclStmt()!.TYPE().text;
        const id = ctx.varDeclStmt()!.ID().text;
        const expr = expressionToAst(ctx.varDeclStmt()!.expr());
        return [new VarDeclarationStatement(ctx.text, type, id, expr)];
      }
      throw new Error('Could not transform external statement to ast');
    }

    function statementToAst(ctx: StmtContext): Statement[] {
      if (ctx.ifStmt()) {
        const conditionExpression = expressionToAst(ctx.ifStmt()!.parenExpr());
        const ifStatements = statementToAst(ctx.ifStmt()!.stmt()[0]);
        const elseStatements = ctx.ifStmt()!.stmt()[1] ? statementToAst(ctx.ifStmt()!.stmt()[1]) : [];
        return [new IfStatement(ctx.text, conditionExpression, ifStatements, elseStatements)];
      } else if (ctx.whileStmt()) {
        const conditionExpression = expressionToAst(ctx.whileStmt()!.parenExpr());
        const bodyStatements = statementToAst(ctx.whileStmt()!.stmt());
        return [new WhileStatement(ctx.text, conditionExpression, bodyStatements)];
      } else if (ctx.stmtBlock()) {
        return ctx.stmtBlock()!.stmt().flatMap(statementToAst);
      } else if (ctx.expr()) {
        return [new ExpressionStatement(ctx.text, expressionToAst(ctx.expr()!))];
      } else if (ctx.varDeclStmt()) {
        const type = ctx.varDeclStmt()!.TYPE().text;
        const id = ctx.varDeclStmt()!.ID().text;
        const expr = expressionToAst(ctx.varDeclStmt()!.expr());
        return [new VarDeclarationStatement(ctx.text, type, id, expr)];
      }
      throw new Error('Unhandled statement on ast generation');
    }

    function expressionToAst(
      ctx:
        | ParenExprContext
        | ExprContext
        | NegExprContext
        | AssignExprContext
        | RelExprContext
        | AddExprContext
        | CallExprContext
        | TermExprContext
        | StringExprContext
        | ArrayExprContext
        | ArrayAccessExprContext
    ): Expression {
      if (ctx instanceof ParenExprContext) {
        return expressionToAst(ctx.expr());
      } else if (ctx instanceof ExprContext) {
        if (ctx.assignExpr()) {
          return expressionToAst(ctx.assignExpr()!);
        } else {
          return expressionToAst(ctx.parenExpr()!);
        }
      } else if (ctx instanceof NegExprContext) {
        if (ctx.getChild(0).text !== '-') {
          return expressionToAst(ctx.callExpr());
        } else {
          return new NegateExpression(ctx.text, expressionToAst(ctx.callExpr()));
        }
      } else if (ctx instanceof AssignExprContext) {
        if (ctx.relExpr()) {
          return expressionToAst(ctx.relExpr()!);
        } else {
          return new AssignExpression(ctx.text, new VarReference(ctx.getChild(0).text, ctx.getChild(0).text), expressionToAst(ctx.expr()!));
        }
      } else if (ctx instanceof RelExprContext) {
        if (!ctx.relExpr()) {
          return expressionToAst(ctx.addExpr());
        } else {
          const operation = ctx.getChild(1).text === '<' ? '<' : '>';
          return new RelationalExpression(ctx.text, operation, expressionToAst(ctx.relExpr()!), expressionToAst(ctx.addExpr()));
        }
      } else if (ctx instanceof AddExprContext) {
        if (!ctx.addExpr()) {
          return expressionToAst(ctx.negExpr());
        } else {
          const operation = ctx.getChild(1).text === '+' ? '+' : '-';
          return new AddExpression(ctx.text, operation, expressionToAst(ctx.addExpr()!), expressionToAst(ctx.negExpr()));
        }
      } else if (ctx instanceof CallExprContext) {
        if (ctx.stringExpr()) {
          return expressionToAst(ctx.stringExpr()!);
        } else {
          return new CallExpression(ctx.text, ctx.getChild(0).text, ctx.expr().map(expressionToAst));
        }
      } else if (ctx instanceof TermExprContext) {
        if (ctx.parenExpr()) {
          return expressionToAst(ctx.parenExpr()!);
        } else {
          const text = ctx.text;
          if (text[0] >= '0' && text[0] <= '9') {
            return new NumberLiteralExpression(text, Number(text));
          } else {
            return new VarReference(text, text);
          }
        }
      } else if (ctx instanceof StringExprContext) {
        if (ctx.arrayExpr()) {
          return expressionToAst(ctx.arrayExpr()!);
        } else {
          const text = ctx.STRING()!.text;
          const value = text.slice(1, text.length - 1);
          return new StringLiteralExpression(ctx.text, value);
        }
      } else if (ctx instanceof ArrayExprContext) {
        if (ctx.arrayAccessExpr()) {
          return expressionToAst(ctx.arrayAccessExpr()!);
        } else {
          const expressions = ctx.expr().map(expressionToAst);
          return new ArrayLiteralExpression(ctx.text, expressions);
        }
      } else if (ctx instanceof ArrayAccessExprContext) {
        if (!ctx.expr()) {
          return expressionToAst(ctx.termExpr()!);
        } else {
          const array = expressionToAst(ctx.termExpr()!);
          const offset = expressionToAst(ctx.expr()!);
          return new ArrayAccessExpression(ctx.text, array, offset);
        }
      }
      throw new Error('Unknown expression: ' + ctx);
    }

    this.statements = programToAst(entryContext);
  }

  process<T>(func: ProcessFunc<T>, ctx?: T) {
    this.statements.forEach(x => x.process(func, ctx));
  }
}
