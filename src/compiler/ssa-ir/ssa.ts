import { Ast, ASTAssignExpression, ASTBinaryExpression, ASTCallExpression, ASTExpression, ASTExpressionStatement, ASTFunctionDeclarationStatement, ASTIfStatement, ASTNumberLiteralExpression, ASTReturnStatement, ASTStatement, ASTStringLiteralExpression, ASTUnaryExpression, ASTVarDeclarationStatement, ASTVarReference, ASTWhileStatement } from "../ast-ir";
import { SSABlock, SSABlockArgument, SSABlockGenerationContext } from "./blocks";
import { SSABinaryInstruction, SSABranchGoInstruction, SSABranchNZInstruction, SSAMoveInstruction, SSARetInstruction, SSAUnaryInstruction } from "./instructions";
import { SSALiteralNumberValue, SSALiteralStringValue, SSAValue, SSAVariable } from "./values";

export class SSA {
  public blocks: SSABlock[] = [];
  
  constructor(ast: Ast) {
    // Convert function to blocks
    function genFunctionDeclBlocks(functionDecl: ASTFunctionDeclarationStatement): SSABlock[] {
      const args = functionDecl.args.map(x => new SSABlockArgument(x.id, x.type));
      const ctx = new SSABlockGenerationContext(functionDecl.id);
      ctx.addBlock().setArgs(args);
      genStatementsBlocks(ctx, functionDecl.stmts);
      return ctx.blocks;
    }

    // Convert statement list to blocks
    function genStatementsBlocks(ctx: SSABlockGenerationContext, statements: ASTStatement[]) {
      for (const statement of statements) {
        if (statement instanceof ASTVarDeclarationStatement) {
          evalExpressionTo(ctx, statement.expression, ctx.getVar(statement.id, true));
        } else if (statement instanceof ASTExpressionStatement) {
          evalExpression(ctx, statement.expression);
        } else if (statement instanceof ASTWhileStatement) {
          const beforeBlock = ctx.curBlock();
          const initialBlock = ctx.addBlock();
          beforeBlock.addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const condVar = ctx.getTmp(true);
          evalExpressionTo(ctx, statement.conditionExpression, condVar);
          const condBlock = ctx.curBlock();
          const bodyBlock = ctx.addBlock();
          genStatementsBlocks(ctx, statement.statements);
          ctx.curBlock().addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const outBlock = ctx.addBlock();
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, bodyBlock, [], outBlock, []));
        } else if (statement instanceof ASTIfStatement) {
          const condVar = ctx.getTmp(true);
          evalExpressionTo(ctx, statement.conditionExpression, condVar);
          const condBlock = ctx.curBlock();
          const ifBlock = ctx.addBlock();
          genStatementsBlocks(ctx, statement.ifStatements);
          const elseBlock = ctx.addBlock();
          genStatementsBlocks(ctx, statement.elseStatements);
          const endBlock = ctx.addBlock();
          ifBlock.addInstruction(new SSABranchGoInstruction(endBlock, []));
          elseBlock.addInstruction(new SSABranchGoInstruction(endBlock, []));
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, ifBlock, [], elseBlock, []));
        } else if (statement instanceof ASTReturnStatement) {
          const dest = ctx.getTmp(true);
          ctx.curBlock()
          .addInstruction(new SSAMoveInstruction(dest, evalExpression(ctx, statement.expression)))
          .addInstruction(new SSARetInstruction(dest));
        } else {
          throw new Error('Unsupported SSA statement generation!');
        }
      }
    }

    function evalExpressionTo(ctx: SSABlockGenerationContext, expression: ASTExpression, dest: SSAVariable) {
      ctx.curBlock().addInstruction(new SSAMoveInstruction(dest, evalExpression(ctx, expression)));
    }

    // Convert expression to blocks and return the output expression
    function evalExpression(ctx: SSABlockGenerationContext, expression: ASTExpression): SSAValue {
      if (expression instanceof ASTVarReference) {
        return ctx.getVar(expression.varName, false);
      } else if (expression instanceof ASTNumberLiteralExpression) {
        return new SSALiteralNumberValue(expression.value);
      } else if (expression instanceof ASTStringLiteralExpression) {
        return new SSALiteralStringValue(expression.value);
      } else if (expression instanceof ASTAssignExpression) {
        return new SSAMoveInstruction(ctx.getVar(expression.varRef.varName, true), evalExpression(ctx, expression.expression));
      } else if (expression instanceof ASTBinaryExpression) {
        const result = ctx.getTmp(true);
        ctx.curBlock().addInstruction(new SSABinaryInstruction(result, evalExpression(ctx, expression.leftExpression), evalExpression(ctx, expression.rightExpression), expression.operation));
        return result;
      } else if (expression instanceof ASTUnaryExpression) {
        const result = ctx.getTmp(true);
        ctx.curBlock().addInstruction(new SSAUnaryInstruction(result, evalExpression(ctx, expression.expression), expression.operation));
        return result;
      } else if (expression instanceof ASTCallExpression) {
        throw new Error('Call expression not supported yet on SSA');
      } else {
        throw new Error('Unsupported SSA expression generation!');
      }
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
