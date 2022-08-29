import { AddExprContext, ArrayAccessExprContext, ArrayExprContext, AssignExprContext, CallExprContext, ExprContext, NegExprContext, ParenExprContext, RelExprContext, StringExprContext, TermExprContext } from "../lex-parser";
import { ASTNode, ASTProcessFunc } from "./ast";

export interface ASTExpression extends ASTNode {}

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

export class ASTUnaryExpression implements ASTExpression {
  constructor(public text: string, public operation: string, public expression: ASTExpression) {}
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

export class ASTCallExpression implements ASTExpression {
  constructor(public text: string, public funcName: string, public paramExpressions: ASTExpression[]) {}
  process<T>(func: ASTProcessFunc<T>, ctx?: T) {
    ctx = func(this, ctx);
    this.paramExpressions.forEach(x => x.process(func, ctx));
  }
}

export function expressionToAst(
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
      return new ASTUnaryExpression(ctx.text, '-', expressionToAst(ctx.callExpr()));
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
      return new ASTBinaryExpression(ctx.text, operation, expressionToAst(ctx.relExpr()!), expressionToAst(ctx.addExpr()));
    }
  } else if (ctx instanceof AddExprContext) {
    if (!ctx.addExpr()) {
      return expressionToAst(ctx.negExpr());
    } else {
      const operation = ctx.getChild(1).text === '+' ? '+' : '-';
      return new ASTBinaryExpression(ctx.text, operation, expressionToAst(ctx.addExpr()!), expressionToAst(ctx.negExpr()));
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
