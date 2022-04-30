import { ExprContext, Id_Context, IntegerContext, Paren_exprContext, ProgramContext, StatementContext, Sum_Context, TermContext, TestContext } from "./antlr/tinycParser";

type ProcessFunc<T=void> = (node: Node, ctx?: T)=>T;

export interface Node {
  process<T>(func: ProcessFunc<T>, ctx?: T): void;
}
export interface Expression extends Node {};
export interface Statement extends Node {};

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

export class AssignExpression implements Expression {
  constructor(
    public varRef: VarReference,
    public expression: Expression
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.varRef.process(func, ctx);
    this.expression.process(func, ctx);
  }
}

export class TestExpression implements Expression {
  constructor(
    public leftExpression: Expression,
    public rightExpression: Expression
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class MathExpression implements Expression {
  constructor(
    public operation: '+' | '-',
    public leftExpression: Expression,
    public rightExpression: Expression
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

export class SubExpression implements Expression {
  constructor(
    public leftExpression: Expression,
    public rightExpression: Expression,
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.leftExpression.process(func, ctx);
    this.rightExpression.process(func, ctx);
  }
}

// Statements

export class PrintStatement implements Statement {
  constructor(
    public expression: Expression,
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.expression.process(func, ctx);
  }
}

export class IfStatement implements Statement {
  constructor(
    public conditionExpression: Expression,
    public ifStatements: Statement[],
    public elseStatements: Statement[]
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.ifStatements.map(x => x.process(func, ctx));
    this.elseStatements.map(x => x.process(func, ctx));
  }
}

export class WhileStatement implements Statement {
  constructor(
    public executeFirst: boolean,
    public conditionExpression: Expression,
    public statements: Statement[]
  ) {}
  process<T>(func: ProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.conditionExpression.process(func, ctx);
    this.statements.map(x => x.process(func, ctx));
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

  constructor(programContext: ProgramContext) {
    function programToAst(ctx: ProgramContext) {
      return ctx.statement().flatMap(statementToAst);
    }

    function statementToAst(ctx: StatementContext): Statement[] {
      const statements: Statement[] = [];
      if (!ctx.children) return statements;
      const [child1,,, child4] = ctx.children;
      if (child1.text === 'if') {
        const conditionExpression = expressionToAst(ctx.paren_expr()!);
        const ifStatements = statementToAst(ctx.statement()[0]);
        const elseStatements = child4?.text === 'else' ? statementToAst(ctx.statement()[1]) : [];
        statements.push(new IfStatement(conditionExpression, ifStatements, elseStatements));
      } else if (child1.text === 'while') {
        const conditionExpression = expressionToAst(ctx.paren_expr()!);
        const bodyStatements = statementToAst(ctx.statement()[0]);
        statements.push(new WhileStatement(false, conditionExpression, bodyStatements));
      } else if (child1.text === 'do') {
        const conditionExpression = expressionToAst(ctx.paren_expr()!);
        const bodyStatements = statementToAst(ctx.statement()[0]);
        statements.push(new WhileStatement(true, conditionExpression, bodyStatements));
      } else if (child1.text === '{') {
        statements.push(...ctx.statement().flatMap(statementToAst));
      } else if (child1.text === 'print') {
        const expression = expressionToAst(ctx.paren_expr()!);
        statements.push(new PrintStatement(expression));
      } else if (child1 instanceof ExprContext) {
        statements.push(expressionToAst(child1));
      }
      return statements;
    }

    function expressionToAst(ctx: Paren_exprContext | ExprContext | TestContext | Sum_Context | TermContext | Id_Context | IntegerContext): Expression {
      if (ctx instanceof Paren_exprContext) {
        return expressionToAst(ctx.expr());
      } else if (ctx instanceof ExprContext) {
        if (ctx.test()) {
          return expressionToAst(ctx.test()!);
        } else {
          return new AssignExpression(new VarReference(ctx.id_()!.text), expressionToAst(ctx.expr()!));
        }
      } else if (ctx instanceof TestContext) {
        if (ctx.sum_().length === 1) {
          return expressionToAst(ctx.sum_()[0]);
        } else {
          return new TestExpression(expressionToAst(ctx.sum_()[0]), expressionToAst(ctx.sum_()[1]));
        }
      } else if (ctx instanceof Sum_Context) {
        if (!ctx.sum_()) {
          return expressionToAst(ctx.term());
        } else {
          if (ctx.getChild(1)!.text === '+') {
            return new MathExpression('+', expressionToAst(ctx.sum_()!), expressionToAst(ctx.term()));
          } else {
            return new MathExpression('-', expressionToAst(ctx.sum_()!), expressionToAst(ctx.term()));
          }
        }
      } else if (ctx instanceof TermContext) {
        const child = ctx.getChild(0);
        if (
          child instanceof Id_Context
          || child instanceof IntegerContext
          || child instanceof Paren_exprContext
        ) {
          return expressionToAst(child);
        }
      } else if (ctx instanceof IntegerContext) {
        return new LiteralExpression(Number(ctx.text));
      } else if (ctx instanceof Id_Context) {
        return new VarReference(ctx.text);
      }
      throw new Error('Unknown expression: ' + ctx);
    }

    this.statements = programToAst(programContext);
  }

  process<T>(func: ProcessFunc<T>, ctx?: T) {
    this.statements.map(x => x.process(func, ctx));
  }
}
