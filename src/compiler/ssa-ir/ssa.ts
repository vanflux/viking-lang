import { Ast, ASTAddExpression, ASTAssignExpression, ASTBinaryExpression, ASTCallExpression, ASTExpression, ASTFunctionDeclarationStatement, ASTNegateExpression, ASTNumberLiteralExpression, ASTRelationalExpression, ASTStatement, ASTStringLiteralExpression, ASTVarDeclarationStatement, ASTVarReference } from "../ast-ir";

export class SSAExpression {}

export class SSAVariable extends SSAExpression {
  constructor(public base: string, public version: number) {super()}

  public next() {
    return new SSAVariable(this.base, this.version + 1)
  }
}

export class SSAUnaryExpression extends SSAExpression {
  constructor(public expression: SSAExpression, public operation: string) {super()}
}

export class SSABinaryExpression extends SSAExpression {
  constructor(public left: SSAExpression, public right: SSAExpression, public operation: string) {super()}
}

export class SSALiteralNumberExpression extends SSAExpression {
  constructor(public value: number) {super()}
}

export class SSALiteralStringExpression extends SSAExpression {
  constructor(public value: string) {super()}
}

export class SSAAssignInstruction {
  constructor(public dest: SSAVariable, public expression: SSAExpression) {}
}

export class SSABlockArgument {
  constructor(public baseVarName: string, public type: string) {};
}

export class SSAInstruction {}

export class SSABlock {
  public instructions: SSAInstruction[] = [];
  constructor(public args: SSABlockArgument[]) {}
}

export class SSABlockGenerationContext {
  public blocks: SSABlock[] = [];
  public variables: SSAVariable[] = [];
  private nextTmpVersion = 0;
  
  public lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public getVar(id: string) {
    const variable = this.variables.find(x => x.base === id);
    if (variable) {
      const newVariable = variable.next();
      this.variables.unshift(newVariable);
      return newVariable;
    } else {
      const newVariable = new SSAVariable(id, 0);
      this.variables.unshift(newVariable);
      return newVariable;

    }
  }

  public getTmp() {
    return this.getVar('_T');
  }
}

export class SSA {
  public blocks: SSABlock[] = [];
  
  constructor(ast: Ast) {
    function genFunctionDeclBlocks(functionDecl: ASTFunctionDeclarationStatement): SSABlock[] {
      const args = functionDecl.args.map<SSABlockArgument>(x => ({ baseVarName: x.id, type: x.type }));
      const ctx = new SSABlockGenerationContext();
      ctx.blocks.push(new SSABlock(args));
      genStatementsBlocks(ctx, functionDecl.stmts);
      return ctx.blocks;
    }

    function genStatementsBlocks(ctx: SSABlockGenerationContext, statements: ASTStatement[]) {
      for (const statement of statements) {
        if (statement instanceof ASTVarDeclarationStatement) {
          const instruction = new SSAAssignInstruction(ctx.getVar(statement.id), genExpressionBlocks(ctx, statement.expression));
          ctx.lastBlock().instructions.push(instruction);
        }
      }
    }

    function genExpressionBlocks(ctx: SSABlockGenerationContext, expression: ASTExpression): SSAExpression {
      if (expression instanceof ASTVarReference) {
        return ctx.getVar(expression.varName);
      } else if (expression instanceof ASTNumberLiteralExpression) {
        return new SSALiteralNumberExpression(expression.value);
      } else if (expression instanceof ASTStringLiteralExpression) {
        return new SSALiteralStringExpression(expression.value);
      } else if (expression instanceof ASTCallExpression) {
        
      } else if (expression instanceof ASTAssignExpression) {
        const expr = genExpressionBlocks(ctx, expression.expression);
        const dest = ctx.getVar(expression.varRef.varName);
        ctx.lastBlock().instructions.push(new SSAAssignInstruction(dest, expr));
        return dest;
      } else if (expression instanceof ASTBinaryExpression) {
        let exprL: SSAExpression, exprR: SSAExpression;
        if (!(expression.leftExpression instanceof ASTNumberLiteralExpression) && !(expression.leftExpression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.leftExpression);
          const dest = ctx.getTmp();
          ctx.lastBlock().instructions.push(new SSAAssignInstruction(dest, expr));
          exprL = dest;
        } else {
          exprL = expression.leftExpression;
        }
        if (!(expression.rightExpression instanceof ASTNumberLiteralExpression) && !(expression.rightExpression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.rightExpression);
          const dest = ctx.getTmp();
          ctx.lastBlock().instructions.push(new SSAAssignInstruction(dest, expr));
          exprR = dest;
        } else {
          exprR = expression.rightExpression;
        }
        return new SSABinaryExpression(exprL, exprR, expression.operation);
      } else if (expression instanceof ASTNegateExpression) {
        if (!(expression.expression instanceof ASTNumberLiteralExpression) && !(expression.expression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.expression);
          const dest = ctx.getTmp();
          ctx.lastBlock().instructions.push(new SSAAssignInstruction(dest, expr));
          return new SSAUnaryExpression(dest, '-');
        } else {
          return new SSAUnaryExpression(expression.expression, '-');
        }
      }
      return new SSAVariable('aaaaaaaaaa', 0);
    }

    ast.externalStatements.forEach(externalStatement => {
      if (externalStatement instanceof ASTFunctionDeclarationStatement) {
        this.blocks.push(...genFunctionDeclBlocks(externalStatement));
      } else if (externalStatement instanceof ASTVarDeclarationStatement) {
        console.error('Not implemented!');
      }
    });
  }
}
