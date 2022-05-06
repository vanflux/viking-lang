// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';

import { EntryContext } from './vikingParser';
import { StatContext } from './vikingParser';
import { ParenExprContext } from './vikingParser';
import { ExprContext } from './vikingParser';
import { AssignExprContext } from './vikingParser';
import { NegExprContext } from './vikingParser';
import { RelExprContext } from './vikingParser';
import { AddExprContext } from './vikingParser';
import { CallExprContext } from './vikingParser';
import { TermExprContext } from './vikingParser';

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
   * Visit a parse tree produced by `vikingParser.stat`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStat?: (ctx: StatContext) => Result;

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
   * Visit a parse tree produced by `vikingParser.negExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitNegExpr?: (ctx: NegExprContext) => Result;

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
   * Visit a parse tree produced by `vikingParser.callExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitCallExpr?: (ctx: CallExprContext) => Result;

  /**
   * Visit a parse tree produced by `vikingParser.termExpr`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTermExpr?: (ctx: TermExprContext) => Result;
}
