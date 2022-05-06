// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

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
   * Enter a parse tree produced by `vikingParser.stat`.
   * @param ctx the parse tree
   */
  enterStat?: (ctx: StatContext) => void;
  /**
   * Exit a parse tree produced by `vikingParser.stat`.
   * @param ctx the parse tree
   */
  exitStat?: (ctx: StatContext) => void;

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
