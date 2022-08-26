// Generated from viking.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { EntryContext } from "./vikingParser";
import { ExternalStmtContext } from "./vikingParser";
import { StmtContext } from "./vikingParser";
import { StmtBlockContext } from "./vikingParser";
import { IfStmtContext } from "./vikingParser";
import { WhileStmtContext } from "./vikingParser";
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
 * This interface defines a complete listener for a parse tree produced by
 * `vikingParser`.
 */
export interface vikingListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `vikingParser.entry`.
	 * @param ctx the parse tree
	 */
	enterEntry?: (ctx: EntryContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.entry`.
	 * @param ctx the parse tree
	 */
	exitEntry?: (ctx: EntryContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.externalStmt`.
	 * @param ctx the parse tree
	 */
	enterExternalStmt?: (ctx: ExternalStmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.externalStmt`.
	 * @param ctx the parse tree
	 */
	exitExternalStmt?: (ctx: ExternalStmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.stmt`.
	 * @param ctx the parse tree
	 */
	enterStmt?: (ctx: StmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.stmt`.
	 * @param ctx the parse tree
	 */
	exitStmt?: (ctx: StmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.stmtBlock`.
	 * @param ctx the parse tree
	 */
	enterStmtBlock?: (ctx: StmtBlockContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.stmtBlock`.
	 * @param ctx the parse tree
	 */
	exitStmtBlock?: (ctx: StmtBlockContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	enterIfStmt?: (ctx: IfStmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.ifStmt`.
	 * @param ctx the parse tree
	 */
	exitIfStmt?: (ctx: IfStmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.whileStmt`.
	 * @param ctx the parse tree
	 */
	enterWhileStmt?: (ctx: WhileStmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.whileStmt`.
	 * @param ctx the parse tree
	 */
	exitWhileStmt?: (ctx: WhileStmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.varDeclStmt`.
	 * @param ctx the parse tree
	 */
	enterVarDeclStmt?: (ctx: VarDeclStmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.varDeclStmt`.
	 * @param ctx the parse tree
	 */
	exitVarDeclStmt?: (ctx: VarDeclStmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.fnDeclStmt`.
	 * @param ctx the parse tree
	 */
	enterFnDeclStmt?: (ctx: FnDeclStmtContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.fnDeclStmt`.
	 * @param ctx the parse tree
	 */
	exitFnDeclStmt?: (ctx: FnDeclStmtContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.parenExpr`.
	 * @param ctx the parse tree
	 */
	enterParenExpr?: (ctx: ParenExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.parenExpr`.
	 * @param ctx the parse tree
	 */
	exitParenExpr?: (ctx: ParenExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.assignExpr`.
	 * @param ctx the parse tree
	 */
	enterAssignExpr?: (ctx: AssignExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.assignExpr`.
	 * @param ctx the parse tree
	 */
	exitAssignExpr?: (ctx: AssignExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.relExpr`.
	 * @param ctx the parse tree
	 */
	enterRelExpr?: (ctx: RelExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.relExpr`.
	 * @param ctx the parse tree
	 */
	exitRelExpr?: (ctx: RelExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.addExpr`.
	 * @param ctx the parse tree
	 */
	enterAddExpr?: (ctx: AddExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.addExpr`.
	 * @param ctx the parse tree
	 */
	exitAddExpr?: (ctx: AddExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.negExpr`.
	 * @param ctx the parse tree
	 */
	enterNegExpr?: (ctx: NegExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.negExpr`.
	 * @param ctx the parse tree
	 */
	exitNegExpr?: (ctx: NegExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.callExpr`.
	 * @param ctx the parse tree
	 */
	enterCallExpr?: (ctx: CallExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.callExpr`.
	 * @param ctx the parse tree
	 */
	exitCallExpr?: (ctx: CallExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.stringExpr`.
	 * @param ctx the parse tree
	 */
	enterStringExpr?: (ctx: StringExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.stringExpr`.
	 * @param ctx the parse tree
	 */
	exitStringExpr?: (ctx: StringExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.arrayExpr`.
	 * @param ctx the parse tree
	 */
	enterArrayExpr?: (ctx: ArrayExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.arrayExpr`.
	 * @param ctx the parse tree
	 */
	exitArrayExpr?: (ctx: ArrayExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.arrayAccessExpr`.
	 * @param ctx the parse tree
	 */
	enterArrayAccessExpr?: (ctx: ArrayAccessExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.arrayAccessExpr`.
	 * @param ctx the parse tree
	 */
	exitArrayAccessExpr?: (ctx: ArrayAccessExprContext) => void;

	/**
	 * Enter a parse tree produced by `vikingParser.termExpr`.
	 * @param ctx the parse tree
	 */
	enterTermExpr?: (ctx: TermExprContext) => void;
	/**
	 * Exit a parse tree produced by `vikingParser.termExpr`.
	 * @param ctx the parse tree
	 */
	exitTermExpr?: (ctx: TermExprContext) => void;
}

