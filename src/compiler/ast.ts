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
  TermExprContext,
} from './antlr/vikingParser';

type ProcessFunc<T = void> = (node: Node, ctx?: T) => T;

export interface Node {
  process<T>(func: ProcessFunc<T>, ctx?: T): void;
}
export interface Expression extends Node {}
export interface Statement extends Node {}

// Expressions

export class VarReference implements Expression {
  constructor(public varName: string) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class LiteralExpression implements Expression {
  constructor(public value: number) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    func(this, ctx);
  }
}

export class NegateExpression implements Expression {
  constructor(public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class AssignExpression implements Expression {
  constructor(public varRef: VarReference, public expression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.varRef.process(func, ctx);
    this.expression.process(func, ctx);
  }
}

export class RelationalExpression implements Expression {
  constructor(public operation: '<' | '>', public leftExpression: Expression, public rightExpression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class AddExpression implements Expression {
  constructor(public operation: '+' | '-', public leftExpression: Expression, public rightExpression: Expression) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class CallExpression implements Expression {
  constructor(public funcName: string, public paramExpressions: Expression[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.paramExpressions.forEach(x => x.process(func, ctx));
  }
}

// Statements

export class IfStatement implements Statement {
  constructor(public conditionExpression: Expression, public ifStatements: Statement[], public elseStatements: Statement[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.ifStatements.forEach(x => x.process(func, ctx));
    this.elseStatements.forEach(x => x.process(func, ctx));
  }
}

export class WhileStatement implements Statement {
  constructor(public conditionExpression: Expression, public statements: Statement[]) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.statements.forEach(x => x.process(func, ctx));
  }
}

export class ExpressionStatement implements Statement {
  constructor(public expression: Expression) {}
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
        statements.push(new IfStatement(conditionExpression, ifStatements, elseStatements));
      } else if (child1.text === 'while') {
        const conditionExpression = expressionToAst(ctx.parenExpr()!);
        const bodyStatements = statementToAst(ctx.stat()[0]);
        statements.push(new WhileStatement(conditionExpression, bodyStatements));
      } else if (child1.text === '{') {
        statements.push(...ctx.stat().flatMap(statementToAst));
      } else if (child1 instanceof ExprContext) {
        statements.push(expressionToAst(child1));
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
          return expressionToAst(ctx.relExpr());
        } else {
          return new NegateExpression(expressionToAst(ctx.relExpr()));
        }
      } else if (ctx instanceof AssignExprContext) {
        if (ctx.negExpr()) {
          return expressionToAst(ctx.negExpr()!);
        } else {
          return new AssignExpression(new VarReference(ctx.getChild(0).text), expressionToAst(ctx.expr()!));
        }
      } else if (ctx instanceof RelExprContext) {
        if (!ctx.relExpr()) {
          return expressionToAst(ctx.addExpr());
        } else {
          const operation = ctx.getChild(1).text === '<' ? '<' : '>';
          return new RelationalExpression(operation, expressionToAst(ctx.relExpr()!), expressionToAst(ctx.addExpr()));
        }
      } else if (ctx instanceof AddExprContext) {
        if (!ctx.addExpr()) {
          return expressionToAst(ctx.callExpr());
        } else {
          const operation = ctx.getChild(1).text === '+' ? '+' : '-';
          return new AddExpression(operation, expressionToAst(ctx.addExpr()!), expressionToAst(ctx.callExpr()));
        }
      } else if (ctx instanceof CallExprContext) {
        if (ctx.termExpr()) {
          return expressionToAst(ctx.termExpr()!);
        } else {
          return new CallExpression(ctx.getChild(0).text, ctx.expr().map(expressionToAst));
        }
      } else if (ctx instanceof TermExprContext) {
        if (ctx.parenExpr()) {
          return expressionToAst(ctx.parenExpr()!);
        } else {
          const text = ctx.text;
          if (text[0] >= '0' && text[0] <= '9') {
            return new LiteralExpression(Number(text));
          } else {
            return new VarReference(text);
          }
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
