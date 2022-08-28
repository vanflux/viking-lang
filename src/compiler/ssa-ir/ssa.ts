import { Ast, ASTAddExpression, ASTAssignExpression, ASTBinaryExpression, ASTCallExpression, ASTExpression, ASTExpressionStatement, ASTFunctionDeclarationStatement, ASTIfStatement, ASTNegateExpression, ASTNumberLiteralExpression, ASTRelationalExpression, ASTReturnStatement, ASTStatement, ASTStringLiteralExpression, ASTVarDeclarationStatement, ASTVarReference, ASTWhileStatement } from "../ast-ir";

// Instructions

export abstract class SSAInstruction {
  public abstract toString(): string;
}

export class SSAAssignInstruction extends SSAInstruction {
  constructor(public dest: SSAVariable, public expression: SSAExpression) {super()}
  
  public toString(): string {
    return `${this.dest.toString()} = ${this.expression.toString()}`;
  }
}

export abstract class SSABranchInstruction extends SSAInstruction {}

export class SSABranchGoInstruction extends SSABranchInstruction {
  constructor(public dest: SSABlock, public params: SSAVariable[]) {super()}
  
  public toString(): string {
    return `BR.GO ${this.dest.name()}(${this.params.map(x => x.toString()).join(', ')})`;
  }
}

export class SSABranchNZInstruction extends SSABranchInstruction {
  constructor(public input: SSAVariable, public destTrue: SSABlock, public paramsTrue: SSAVariable[], public destFalse: SSABlock, public paramsFalse: SSAVariable[]) {super()}
  
  public toString(): string {
    const strTrue =  `${this.destTrue.name()}(${this.paramsTrue.map(x => x.toString()).join(', ')})`;
    const strFalse = `${this.destFalse.name()}(${this.paramsFalse.map(x => x.toString()).join(', ')})`;
    return `BR.NZ ${this.input.toString()} ${strTrue} ${strFalse}`;
  }
}

export class SSARetInstruction extends SSAInstruction {
  constructor(public retVar: SSAVariable) {super()}
  
  public toString(): string {
    return `RET ${this.retVar.toString()}`;
  }
}

// Expressions

export abstract class SSAExpression {
  public abstract toString(): string;
}

export class SSAVariable extends SSAExpression {
  constructor(public base: string, public version: number) {super()}

  public next() {
    return new SSAVariable(this.base, this.version + 1)
  }

  public toString(): string {
    return `${this.base}${this.version}`;
  }
}

export class SSAUnaryExpression extends SSAExpression {
  constructor(public expression: SSAExpression, public operation: string) {super()}

  public toString(): string {
    return `${this.operation} ${this.expression.toString()}`;
  }
}

export class SSABinaryExpression extends SSAExpression {
  constructor(public left: SSAExpression, public right: SSAExpression, public operation: string) {super()}
  
  public toString(): string {
    return `${this.left.toString()} ${this.operation} ${this.right.toString()}`;
  }
}

export class SSALiteralNumberExpression extends SSAExpression {
  constructor(public value: number) {super()}

  public toString(): string {
    return `${this.value}`;
  }
}

export class SSALiteralStringExpression extends SSAExpression {
  constructor(public value: string) {super()}
  
  public toString(): string {
    return `"${this.value}"`;
  }
}

// Blocks

export class SSABlockArgument {
  constructor(public baseVarName: string, public type: string) {};

  public toString() {
    return `${this.type} ${this.baseVarName}?`;
  }
}

export class SSABlock {
  public instructions: SSAInstruction[] = [];
  public args: SSABlockArgument[] = [];
  constructor(public id: number) {}
  
  public setArgs(args: SSABlockArgument[]) {
    this.args = args;
    return this;
  }

  public addInstruction(instruction: SSAInstruction) {
    this.instructions.push(instruction);
    return this;
  }

  public name() {
    return `BLOCK_${this.id}`;
  }

  public toString() {
    return `${this.name()}(${this.args.map(x => x.toString()).join(', ')}):\n${this.instructions.map(x => x.toString()).join('\n')}`;
  }
}

export class SSABlockGenerationContext {
  public blocks: SSABlock[] = [];
  public variables: SSAVariable[] = [];
  
  public lastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  public newBlock() {
    const block = new SSABlock(this.blocks.length);
    this.blocks.push(block);
    return block;
  }

  public getVar(id: string, isNew: boolean) {
    const variable = this.variables.find(x => x.base === id);
    if (variable) {
      if (isNew) {
        const newVariable = variable.next();
        this.variables.unshift(newVariable);
        return newVariable;
      }
      return variable;
    } else {
      const newVariable = new SSAVariable(id, 0);
      this.variables.unshift(newVariable);
      return newVariable;

    }
  }

  public getTmp(isNew: boolean) {
    return this.getVar('_T', isNew);
  }
}

export class SSA {
  public blocks: SSABlock[] = [];
  
  constructor(ast: Ast) {
    // Convert function to blocks
    function genFunctionDeclBlocks(functionDecl: ASTFunctionDeclarationStatement): SSABlock[] {
      const args = functionDecl.args.map(x => new SSABlockArgument(x.id, x.type));
      const ctx = new SSABlockGenerationContext();
      console.log(args)
      ctx.newBlock().setArgs(args);
      genStatementsBlocks(ctx, functionDecl.stmts);
      return ctx.blocks;
    }

    // Convert statement list to blocks
    function genStatementsBlocks(ctx: SSABlockGenerationContext, statements: ASTStatement[]) {
      for (const statement of statements) {
        if (statement instanceof ASTVarDeclarationStatement) {
          ctx.lastBlock().addInstruction(new SSAAssignInstruction(ctx.getVar(statement.id, true), genExpressionBlocks(ctx, statement.expression)));
        } else if (statement instanceof ASTExpressionStatement) {
          genExpressionBlocks(ctx, statement.expression);
        } else if (statement instanceof ASTWhileStatement) {
          const beforeBlock = ctx.lastBlock();
          const initialBlock = ctx.newBlock();
          beforeBlock.addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const condVar = ctx.getTmp(true);
          const condBlock = ctx.lastBlock().addInstruction(new SSAAssignInstruction(condVar, genExpressionBlocks(ctx, statement.conditionExpression)));
          const bodyBlock = ctx.newBlock();
          genStatementsBlocks(ctx, statement.statements);
          ctx.lastBlock().addInstruction(new SSABranchGoInstruction(initialBlock, []));
          const outBlock = ctx.newBlock();
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, bodyBlock, [], outBlock, []));
        } else if (statement instanceof ASTIfStatement) {
          const condVar = ctx.getTmp(true);
          const condBlock = ctx.lastBlock().addInstruction(new SSAAssignInstruction(condVar, genExpressionBlocks(ctx, statement.conditionExpression)));
          const ifBlock = ctx.newBlock();
          genStatementsBlocks(ctx, statement.ifStatements);
          const elseBlock = ctx.newBlock();
          genStatementsBlocks(ctx, statement.elseStatements);
          const endBlock = ctx.newBlock();
          ifBlock.addInstruction(new SSABranchGoInstruction(endBlock, []));
          elseBlock.addInstruction(new SSABranchGoInstruction(endBlock, []));
          condBlock.addInstruction(new SSABranchNZInstruction(condVar, ifBlock, [], elseBlock, []));
        } else if (statement instanceof ASTReturnStatement) {
          const dest = ctx.getTmp(true);
          ctx.lastBlock()
          .addInstruction(new SSAAssignInstruction(dest, genExpressionBlocks(ctx, statement.expression)))
          .addInstruction(new SSARetInstruction(dest));
        } else {
          throw new Error('Unsupported SSA statement generation!');
        }
      }
    }

    // Convert expression to blocks and return the output expression
    function genExpressionBlocks(ctx: SSABlockGenerationContext, expression: ASTExpression): SSAExpression {
      if (expression instanceof ASTVarReference) {
        return ctx.getVar(expression.varName, false);
      } else if (expression instanceof ASTNumberLiteralExpression) {
        return new SSALiteralNumberExpression(expression.value);
      } else if (expression instanceof ASTStringLiteralExpression) {
        return new SSALiteralStringExpression(expression.value);
      } else if (expression instanceof ASTCallExpression) {
        
      } else if (expression instanceof ASTAssignExpression) {
        const expr = genExpressionBlocks(ctx, expression.expression);
        const dest = ctx.getVar(expression.varRef.varName, true);
        ctx.lastBlock().addInstruction(new SSAAssignInstruction(dest, expr));
        return dest;
      } else if (expression instanceof ASTBinaryExpression) {
        let exprL: SSAExpression, exprR: SSAExpression;
        if (!(expression.leftExpression instanceof ASTNumberLiteralExpression) && !(expression.leftExpression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.leftExpression);
          const dest = ctx.getTmp(true);
          ctx.lastBlock().addInstruction(new SSAAssignInstruction(dest, expr));
          exprL = dest;
        } else {
          exprL = genExpressionBlocks(ctx, expression.leftExpression);
        }
        if (!(expression.rightExpression instanceof ASTNumberLiteralExpression) && !(expression.rightExpression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.rightExpression);
          const dest = ctx.getTmp(true);
          ctx.lastBlock().addInstruction(new SSAAssignInstruction(dest, expr));
          exprR = dest;
        } else {
          exprR = genExpressionBlocks(ctx, expression.rightExpression);
        }
        return new SSABinaryExpression(exprL, exprR, expression.operation);
      } else if (expression instanceof ASTNegateExpression) {
        if (!(expression.expression instanceof ASTNumberLiteralExpression) && !(expression.expression instanceof ASTVarReference)) {
          const expr = genExpressionBlocks(ctx, expression.expression);
          const dest = ctx.getTmp(true);
          ctx.lastBlock().addInstruction(new SSAAssignInstruction(dest, expr));
          return new SSAUnaryExpression(dest, '-');
        } else {
          return new SSAUnaryExpression(expression.expression, '-');
        }
      }
      throw new Error('Unsupported SSA expression generation!');
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
