import { ExternalStmtContext, StmtContext } from "../lex-parser";
import { ASTNode, ASTProcessFunc } from "./ast";
import { ASTExpression, expressionToAst } from "./expressions";

export interface ASTStatement extends ASTNode {}

export interface ASTFunctionArgument {
  type: string;
  id: string;
}

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

export class ASTReturnStatement implements ASTStatement {
  constructor(public text: string, public expression: ASTExpression) {}
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

export function externalStmtToAst(ctx: ExternalStmtContext): ASTStatement[] {
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

export function statementToAst(ctx: StmtContext): ASTStatement[] {
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
  } else if (ctx.retStmt()) {
    const expr = expressionToAst(ctx.retStmt()!.expr());
    return [new ASTReturnStatement(ctx.text, expr)];
  }
  throw new Error('Unhandled statement on ast generation');
}
