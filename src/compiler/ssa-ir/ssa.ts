import { Ast, ASTAssignExpression, ASTBinaryExpression, ASTCallExpression, ASTExpression, ASTExpressionStatement, ASTFunctionDeclarationStatement, ASTIfStatement, ASTNumberLiteralExpression, ASTReturnStatement, ASTStatement, ASTStringLiteralExpression, ASTUnaryExpression, ASTVarDeclarationStatement, ASTVarReference, ASTWhileStatement } from "../ast-ir";
import { SSABlock, SSABlockArgument, SSABlockGenerationContext } from "./blocks";
import { SSABinaryInstruction, SSABranchGoInstruction, SSABranchNZInstruction, SSACallInstruction, SSAMoveInstruction, SSARetInstruction, SSAUnaryInstruction } from "./instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAValue, SSAVariable } from "./values";

export class SSA {
  public allBlocks: SSABlock[] = [];
  public blocksPerFunction = new Map<string, SSABlock[]>();
  
  constructor(ast: Ast) {
    // Convert function to blocks
    const genFunctionDeclBlocks = (functionDecl: ASTFunctionDeclarationStatement) => {
      const args = functionDecl.args.map(x => new SSABlockArgument(new SSAVariable(x.id, 0, x.type)));
      const existentBlocks = this.blocksPerFunction.get(functionDecl.id);
      const ctx = new SSABlockGenerationContext(functionDecl.id, existentBlocks);
      if (!existentBlocks?.length) {
        ctx.addBlock();
      }
      ctx.curBlock().setArgs(args);
      genStatementsBlocks(ctx, functionDecl.stmts);
      this.allBlocks.push(...ctx.blocks);
      this.blocksPerFunction.set(functionDecl.id, ctx.blocks);
    }

    // Convert statement list to blocks
    const genStatementsBlocks = (ctx: SSABlockGenerationContext, statements: ASTStatement[]) => {
      for (const statement of statements) {
        if (statement instanceof ASTVarDeclarationStatement) {
          evalExpressionTo(ctx, statement.expression, ctx.curBlock().getVar(statement.id, true));
        } else if (statement instanceof ASTExpressionStatement) {
          evalExpression(ctx, statement.expression);
        } else if (statement instanceof ASTWhileStatement) {
          const beforeBlock = ctx.curBlock();
          const initialBlock = ctx.addBlock();
          beforeBlock.addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const condVar = ctx.curBlock().getTmp(true);
          evalExpressionTo(ctx, statement.conditionExpression, condVar);
          const condBlock = ctx.curBlock();
          const bodyBlock = ctx.addBlock();
          genStatementsBlocks(ctx, statement.statements);
          ctx.curBlock().addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const outBlock = ctx.addBlock();
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, bodyBlock, [], outBlock, []));
        } else if (statement instanceof ASTIfStatement) {
          const condVar = ctx.curBlock().getTmp(true);
          evalExpressionTo(ctx, statement.conditionExpression, condVar);
          const condBlock = ctx.curBlock();

          const ifBlockStart = ctx.addBlock();
          genStatementsBlocks(ctx, statement.ifStatements);
          const ifBlockEnd = ctx.curBlock();

          const elseBlockStart = ctx.addBlock();
          genStatementsBlocks(ctx, statement.elseStatements);
          const elseBlockEnd = ctx.curBlock();

          const endBlock = ctx.addBlock();
          
          ifBlockEnd.addInstruction(new SSABranchGoInstruction(endBlock, []));
          elseBlockEnd.addInstruction(new SSABranchGoInstruction(endBlock, []));
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, ifBlockStart, [], elseBlockStart, []));
        } else if (statement instanceof ASTReturnStatement) {
          const dest = ctx.curBlock().getTmp(true);
          ctx.curBlock()
          .addInstruction(new SSAMoveInstruction(dest, evalExpression(ctx, statement.expression)))
          .addInstruction(new SSARetInstruction(dest));
        } else {
          throw new Error('Unsupported SSA statement generation!');
        }
      }
    }

    const evalExpressionTo = (ctx: SSABlockGenerationContext, expression: ASTExpression, dest: SSAVariable) => {
      ctx.curBlock().addInstruction(new SSAMoveInstruction(dest, evalExpression(ctx, expression)));
    }

    // Convert expression to blocks and return the output expression
    const evalExpression = (ctx: SSABlockGenerationContext, expression: ASTExpression): SSAValue => {
      if (expression instanceof ASTVarReference) {
        return ctx.curBlock().getVar(expression.varName, false);
      } else if (expression instanceof ASTNumberLiteralExpression) {
        return new SSALiteralNumberValue(expression.value, 'int');
      } else if (expression instanceof ASTStringLiteralExpression) {
        return new SSALiteralStringValue(expression.value);
      } else if (expression instanceof ASTAssignExpression) {
        const value = evalExpression(ctx, expression.expression);
        const dest = ctx.curBlock().getVar(expression.varRef.varName, true);
        ctx.curBlock().addInstruction(new SSAMoveInstruction(dest, value));
        return dest;
      } else if (expression instanceof ASTBinaryExpression) {
        const leftValue = evalExpression(ctx, expression.leftExpression);
        const rightValue = evalExpression(ctx, expression.rightExpression);
        const result = ctx.curBlock().getTmp(true);
        ctx.curBlock().addInstruction(new SSABinaryInstruction(result, leftValue, rightValue, expression.operation));
        return result;
      } else if (expression instanceof ASTUnaryExpression) {
        const value = evalExpression(ctx, expression.expression);
        const result = ctx.curBlock().getTmp(true);
        ctx.curBlock().addInstruction(new SSAUnaryInstruction(result, value, expression.operation));
        return result;
      } else if (expression instanceof ASTCallExpression) {
        const dest = ctx.curBlock().getTmp(true);
        const args = expression.paramExpressions.map(param => evalExpression(ctx, param));
        let func = this.blocksPerFunction.get(expression.funcName)?.[0];
        if (!func) {
          func = new SSABlock(expression.funcName, 0, undefined);
          this.blocksPerFunction.set(expression.funcName, [func]);
        }
        ctx.curBlock().addInstruction(new SSACallInstruction(func, dest, args));
        return dest;
      } else {
        throw new Error('Unsupported SSA expression generation!');
      }
    }

    ast.externalStatements.forEach(externalStatement => {
      if (externalStatement instanceof ASTFunctionDeclarationStatement) {
        genFunctionDeclBlocks(externalStatement);
      } else if (externalStatement instanceof ASTVarDeclarationStatement) {
        console.error('Not implemented!');
      }
    });
  }

  toString() {
    return this.allBlocks.map(block => block.toString()).join('\n\n');
  }
}
