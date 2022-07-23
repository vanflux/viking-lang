import {
  AddExprContext,
  AssignExprContext,
  CallExprContext,
  EntryContext,
  ExprContext,
  NegExprContext,
  ParenExprContext,
  RelExprContext,
  StatContext,
  StringExprContext,
  TermExprContext,
} from './antlr/vikingParser';

type ProcessFunc<T = void> = (node: Node, ctx?: T) => T;

export interface Node {
  text: string;
  process<T>(func: ProcessFunc<T>, ctx?: T): void;
}
export interface Expression extends Node {}
export interface Statement extends Node {}

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

// Ast

export class Ast {
  statements: Statement[];

  constructor(entryContext: EntryContext) {
    function programToAst(ctx: EntryContext) {
      return ctx.stat().flatMap(statementToAst);
    }

    function statementToAst(ctx: StatContext): Statement[] {
      const statements: Statement[] = [];
      if (!ctx.children) return statements;
      const [child1, , , child4] = ctx.children;
      if (child1.text === 'if') {
        const conditionExpression = expressionToAst(ctx.parenExpr()!);
        const ifStatements = statementToAst(ctx.stat()[0]);
        const elseStatements = child4?.text === 'else' ? statementToAst(ctx.stat()[1]) : [];
        statements.push(new IfStatement(ctx.text, conditionExpression, ifStatements, elseStatements));
      } else if (child1.text === 'while') {
        const conditionExpression = expressionToAst(ctx.parenExpr()!);
        const bodyStatements = statementToAst(ctx.stat()[0]);
        statements.push(new WhileStatement(ctx.text, conditionExpression, bodyStatements));
      } else if (child1.text === '{') {
        statements.push(...ctx.stat().flatMap(statementToAst));
      } else if (child1 instanceof ExprContext) {
        statements.push(new ExpressionStatement(ctx.text, expressionToAst(child1)));
      } else {
        throw new Error('Unhandled statement on ast generation');
      }
      return statements;
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
        if (ctx.termExpr()) {
          return expressionToAst(ctx.termExpr()!);
        } else {
          return new CallExpression(ctx.text, ctx.getChild(0).text, ctx.expr().map(expressionToAst));
        }
      } else if (ctx instanceof TermExprContext) {
        if (ctx.stringExpr()) {
          return expressionToAst(ctx.stringExpr()!);
        } else {
          const text = ctx.text;
          if (text[0] >= '0' && text[0] <= '9') {
            return new NumberLiteralExpression(text, Number(text));
          } else {
            return new VarReference(text, text);
          }
        }
      } else if (ctx instanceof StringExprContext) {
        if (ctx.parenExpr()) {
          return expressionToAst(ctx.parenExpr()!);
        } else {
          const text = ctx.STRING()!.text;
          const value = text.slice(1, text.length - 1);
          return new StringLiteralExpression(ctx.text, value);
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
