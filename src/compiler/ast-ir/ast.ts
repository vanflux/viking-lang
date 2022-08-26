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

type ASTProcessFunc<T = void> = (node: ASTNode, ctx?: T) => T;

export interface ASTNode {
  text: string;
  process<T>(func: ASTProcessFunc<T>, ctx?: T): void;
}
export interface ASTExpression extends ASTNode {}
export interface ASTStatement extends ASTNode {}

export interface ASTFunctionArgument {
  type: string;
  id: string;
}

// Expressions

export class ASTVarReference implements ASTExpression {
  constructor(public text: string, public varName: string) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ASTNumberLiteralExpression implements ASTExpression {
  constructor(public text: string, public value: number) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ASTStringLiteralExpression implements ASTExpression {
  constructor(public text: string, public value: string) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ASTArrayLiteralExpression implements ASTExpression {
  constructor(public text: string, public expressions: ASTExpression[]) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ASTArrayAccessExpression implements ASTExpression {
  constructor(public text: string, public array: ASTExpression, public offset: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class ASTNegateExpression implements ASTExpression {
  constructor(public text: string, public expression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class ASTAssignExpression implements ASTExpression {
  constructor(public text: string, public varRef: ASTVarReference, public expression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.varRef.process(func, ctx);
    this.expression.process(func, ctx);
  }
}

export class ASTBinaryExpression implements ASTExpression {
  constructor(public text: string, public operation: string, public leftExpression: ASTExpression, public rightExpression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class ASTRelationalExpression extends ASTBinaryExpression {}
export class ASTAddExpression extends ASTBinaryExpression {}

export class ASTCallExpression implements ASTExpression {
  constructor(public text: string, public funcName: string, public paramExpressions: ASTExpression[]) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.paramExpressions.forEach(x => x.process(func, ctx));
  }
}

// Statements

export class ASTIfStatement implements ASTStatement {
  constructor(
    public text: string,
    public conditionExpression: ASTExpression,
    public ifStatements: ASTStatement[],
    public elseStatements: ASTStatement[]
  ) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.ifStatements.forEach(x => x.process(func, ctx));
    this.elseStatements.forEach(x => x.process(func, ctx));
  }
}

export class ASTWhileStatement implements ASTStatement {
  constructor(public text: string, public conditionExpression: ASTExpression, public statements: ASTStatement[]) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.statements.forEach(x => x.process(func, ctx));
  }
}

export class ASTExpressionStatement implements ASTStatement {
  constructor(public text: string, public expression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class ASTVarDeclarationStatement implements ASTStatement {
  constructor(public text: string, public type: string, public id: string, public expression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class ASTFunctionDeclarationStatement implements ASTStatement {
  constructor(public text: string, public type: string, public id: string, public args: ASTFunctionArgument[], public stmts: ASTStatement[]) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.stmts.forEach(x => x.process(func, ctx));
  }
}

export class ASTExternalStatement implements ASTStatement {
  constructor(public text: string, public expression: ASTExpression) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

// Ast

export class Ast {
  externalStatements: ASTStatement[];

  constructor(entryContext: EntryContext) {
    function programToAst(ctx: EntryContext) {
      return ctx.externalStmt().flatMap(externalStmtToAst);
    }

    function externalStmtToAst(ctx: ExternalStmtContext): ASTStatement[] {
      if (ctx.fnDeclStmt()) {
        const types = ctx.fnDeclStmt()!.TYPE().map(x => x.text);
        const ids = ctx.fnDeclStmt()!.ID().map(x => x.text);
        const args = types.slice(1).map<ASTFunctionArgument>((type, i) => ({ type, id: ids[i+1] }));
        const stmts = statementToAst(ctx.fnDeclStmt()!.stmt());
        return [new ASTFunctionDeclarationStatement(ctx.text, types[0], ids[0], args, stmts)];
      } else if (ctx.varDeclStmt()) {
        const type = ctx.varDeclStmt()!.TYPE().text;
        const id = ctx.varDeclStmt()!.ID().text;
        const expr = expressionToAst(ctx.varDeclStmt()!.expr());
        return [new ASTVarDeclarationStatement(ctx.text, type, id, expr)];
      }
      throw new Error('Could not transform external statement to ast');
    }

    function statementToAst(ctx: StmtContext): ASTStatement[] {
      if (ctx.ifStmt()) {
        const conditionExpression = expressionToAst(ctx.ifStmt()!.parenExpr());
        const ifStatements = statementToAst(ctx.ifStmt()!.stmt()[0]);
        const elseStatements = ctx.ifStmt()!.stmt()[1] ? statementToAst(ctx.ifStmt()!.stmt()[1]) : [];
        return [new ASTIfStatement(ctx.text, conditionExpression, ifStatements, elseStatements)];
      } else if (ctx.whileStmt()) {
        const conditionExpression = expressionToAst(ctx.whileStmt()!.parenExpr());
        const bodyStatements = statementToAst(ctx.whileStmt()!.stmt());
        return [new ASTWhileStatement(ctx.text, conditionExpression, bodyStatements)];
      } else if (ctx.stmtBlock()) {
        return ctx.stmtBlock()!.stmt().flatMap(statementToAst);
      } else if (ctx.expr()) {
        return [new ASTExpressionStatement(ctx.text, expressionToAst(ctx.expr()!))];
      } else if (ctx.varDeclStmt()) {
        const type = ctx.varDeclStmt()!.TYPE().text;
        const id = ctx.varDeclStmt()!.ID().text;
        const expr = expressionToAst(ctx.varDeclStmt()!.expr());
        return [new ASTVarDeclarationStatement(ctx.text, type, id, expr)];
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
    ): ASTExpression {
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
          return new ASTNegateExpression(ctx.text, expressionToAst(ctx.callExpr()));
        }
      } else if (ctx instanceof AssignExprContext) {
        if (ctx.relExpr()) {
          return expressionToAst(ctx.relExpr()!);
        } else {
          return new ASTAssignExpression(ctx.text, new ASTVarReference(ctx.getChild(0).text, ctx.getChild(0).text), expressionToAst(ctx.expr()!));
        }
      } else if (ctx instanceof RelExprContext) {
        if (!ctx.relExpr()) {
          return expressionToAst(ctx.addExpr());
        } else {
          const operation = ctx.getChild(1).text === '<' ? '<' : '>';
          return new ASTRelationalExpression(ctx.text, operation, expressionToAst(ctx.relExpr()!), expressionToAst(ctx.addExpr()));
        }
      } else if (ctx instanceof AddExprContext) {
        if (!ctx.addExpr()) {
          return expressionToAst(ctx.negExpr());
        } else {
          const operation = ctx.getChild(1).text === '+' ? '+' : '-';
          return new ASTAddExpression(ctx.text, operation, expressionToAst(ctx.addExpr()!), expressionToAst(ctx.negExpr()));
        }
      } else if (ctx instanceof CallExprContext) {
        if (ctx.stringExpr()) {
          return expressionToAst(ctx.stringExpr()!);
        } else {
          return new ASTCallExpression(ctx.text, ctx.getChild(0).text, ctx.expr().map(expressionToAst));
        }
      } else if (ctx instanceof TermExprContext) {
        if (ctx.parenExpr()) {
          return expressionToAst(ctx.parenExpr()!);
        } else {
          const text = ctx.text;
          if (text[0] >= '0' && text[0] <= '9') {
            return new ASTNumberLiteralExpression(text, Number(text));
          } else {
            return new ASTVarReference(text, text);
          }
        }
      } else if (ctx instanceof StringExprContext) {
        if (ctx.arrayExpr()) {
          return expressionToAst(ctx.arrayExpr()!);
        } else {
          const text = ctx.STRING()!.text;
          const value = text.slice(1, text.length - 1);
          return new ASTStringLiteralExpression(ctx.text, value);
        }
      } else if (ctx instanceof ArrayExprContext) {
        if (ctx.arrayAccessExpr()) {
          return expressionToAst(ctx.arrayAccessExpr()!);
        } else {
          const expressions = ctx.expr().map(expressionToAst);
          return new ASTArrayLiteralExpression(ctx.text, expressions);
        }
      } else if (ctx instanceof ArrayAccessExprContext) {
        if (!ctx.expr()) {
          return expressionToAst(ctx.termExpr()!);
        } else {
          const array = expressionToAst(ctx.termExpr()!);
          const offset = expressionToAst(ctx.expr()!);
          return new ASTArrayAccessExpression(ctx.text, array, offset);
        }
      }
      throw new Error('Unknown expression: ' + ctx);
    }

    this.externalStatements = programToAst(entryContext);
  }

  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    this.externalStatements.forEach(x => x.process(func, ctx));
  }
}
