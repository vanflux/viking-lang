// Generated from viking.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { EntryContext } from "./vikingParser";
import { ExternalStmtContext } from "./vikingParser";
import { StmtContext } from "./vikingParser";
import { IfStmtContext } from "./vikingParser";
import { WhileStmtContext } from "./vikingParser";
import { RetStmtContext } from "./vikingParser";
import { StmtBlockContext } from "./vikingParser";
import { VarDeclStmtContext } from "./vikingParser";
import { FnDeclStmtContext } from "./vikingParser";
import { ParenExprContext } from "./vikingParser";
import { ExprContext } from "./vikingParser";
import { AssignExprContext } from "./vikingParser";
import { RelExprContext } from "./vikingParser";
import { AddExprContext } from "./vikingParser";
import { NegExprContext } from "./vikingParser";
import { CallExprContext } from "./vikingParser";
import { StringExprContext } from "./vikingParser";
import { ArrayExprContext } from "./vikingParser";
import { ArrayAccessExprContext } from "./vikingParser";
import { TermExprContext } from "./vikingParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `vikingParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface vikingVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `vikingParser.entry`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntry?: (ctx: EntryContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.externalStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalStmt?: (ctx: ExternalStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmt?: (ctx: StmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.ifStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStmt?: (ctx: IfStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.whileStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhileStmt?: (ctx: WhileStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.retStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetStmt?: (ctx: RetStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.stmtBlock`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStmtBlock?: (ctx: StmtBlockContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.varDeclStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarDeclStmt?: (ctx: VarDeclStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.fnDeclStmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFnDeclStmt?: (ctx: FnDeclStmtContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.parenExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenExpr?: (ctx: ParenExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.assignExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignExpr?: (ctx: AssignExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.relExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelExpr?: (ctx: RelExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.addExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddExpr?: (ctx: AddExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.negExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNegExpr?: (ctx: NegExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.callExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCallExpr?: (ctx: CallExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.stringExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringExpr?: (ctx: StringExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.arrayExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayExpr?: (ctx: ArrayExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.arrayAccessExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayAccessExpr?: (ctx: ArrayAccessExprContext) => Result;

	/**
	 * Visit a parse tree produced by `vikingParser.termExpr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpr?: (ctx: TermExprContext) => Result;
}

