// Generated from src/compiler/grammar/tinyc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ProgramContext } from "./tinycParser";
import { StatementContext } from "./tinycParser";
import { Paren_exprContext } from "./tinycParser";
import { ExprContext } from "./tinycParser";
import { TestContext } from "./tinycParser";
import { Sum_Context } from "./tinycParser";
import { TermContext } from "./tinycParser";
import { Id_Context } from "./tinycParser";
import { IntegerContext } from "./tinycParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `tinycParser`.
 */
export interface tinycListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `tinycParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.paren_expr`.
	 * @param ctx the parse tree
	 */
	enterParen_expr?: (ctx: Paren_exprContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.paren_expr`.
	 * @param ctx the parse tree
	 */
	exitParen_expr?: (ctx: Paren_exprContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.test`.
	 * @param ctx the parse tree
	 */
	enterTest?: (ctx: TestContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.test`.
	 * @param ctx the parse tree
	 */
	exitTest?: (ctx: TestContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.sum_`.
	 * @param ctx the parse tree
	 */
	enterSum_?: (ctx: Sum_Context) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.sum_`.
	 * @param ctx the parse tree
	 */
	exitSum_?: (ctx: Sum_Context) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.term`.
	 * @param ctx the parse tree
	 */
	enterTerm?: (ctx: TermContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.term`.
	 * @param ctx the parse tree
	 */
	exitTerm?: (ctx: TermContext) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.id_`.
	 * @param ctx the parse tree
	 */
	enterId_?: (ctx: Id_Context) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.id_`.
	 * @param ctx the parse tree
	 */
	exitId_?: (ctx: Id_Context) => void;

	/**
	 * Enter a parse tree produced by `tinycParser.integer`.
	 * @param ctx the parse tree
	 */
	enterInteger?: (ctx: IntegerContext) => void;
	/**
	 * Exit a parse tree produced by `tinycParser.integer`.
	 * @param ctx the parse tree
	 */
	exitInteger?: (ctx: IntegerContext) => void;
}

