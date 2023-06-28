// Generated from viking.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { vikingListener } from "./vikingListener";
import { vikingVisitor } from "./vikingVisitor";


export class vikingParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly TYPE = 18;
	public static readonly STRING = 19;
	public static readonly ID = 20;
	public static readonly DIGITS = 21;
	public static readonly WS = 22;
	public static readonly RULE_entry = 0;
	public static readonly RULE_externalStmt = 1;
	public static readonly RULE_stmt = 2;
	public static readonly RULE_ifStmt = 3;
	public static readonly RULE_whileStmt = 4;
	public static readonly RULE_retStmt = 5;
	public static readonly RULE_stmtBlock = 6;
	public static readonly RULE_varDeclStmt = 7;
	public static readonly RULE_fnDeclStmt = 8;
	public static readonly RULE_parenExpr = 9;
	public static readonly RULE_expr = 10;
	public static readonly RULE_assignExpr = 11;
	public static readonly RULE_relExpr = 12;
	public static readonly RULE_addExpr = 13;
	public static readonly RULE_negExpr = 14;
	public static readonly RULE_callExpr = 15;
	public static readonly RULE_stringExpr = 16;
	public static readonly RULE_arrayExpr = 17;
	public static readonly RULE_arrayAccessExpr = 18;
	public static readonly RULE_termExpr = 19;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"entry", "externalStmt", "stmt", "ifStmt", "whileStmt", "retStmt", "stmtBlock", 
		"varDeclStmt", "fnDeclStmt", "parenExpr", "expr", "assignExpr", "relExpr", 
		"addExpr", "negExpr", "callExpr", "stringExpr", "arrayExpr", "arrayAccessExpr", 
		"termExpr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "'if'", "'else'", "'while'", "'return'", "'{'", "'}'", 
		"'='", "'('", "','", "')'", "'<'", "'>'", "'+'", "'-'", "'['", "']'", 
		"'int'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "TYPE", "STRING", "ID", "DIGITS", 
		"WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(vikingParser._LITERAL_NAMES, vikingParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return vikingParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "viking.g4"; }

	// @Override
	public get ruleNames(): string[] { return vikingParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return vikingParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(vikingParser._ATN, this);
	}
	// @RuleVersion(0)
	public entry(): EntryContext {
		let _localctx: EntryContext = new EntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, vikingParser.RULE_entry);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 40;
				this.externalStmt();
				}
				}
				this.state = 43;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === vikingParser.TYPE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public externalStmt(): ExternalStmtContext {
		let _localctx: ExternalStmtContext = new ExternalStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, vikingParser.RULE_externalStmt);
		try {
			this.state = 47;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 45;
				this.varDeclStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 46;
				this.fnDeclStmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmt(): StmtContext {
		let _localctx: StmtContext = new StmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, vikingParser.RULE_stmt);
		try {
			this.state = 58;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.TYPE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 49;
				this.varDeclStmt();
				}
				break;
			case vikingParser.T__1:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 50;
				this.ifStmt();
				}
				break;
			case vikingParser.T__3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 51;
				this.whileStmt();
				}
				break;
			case vikingParser.T__4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 52;
				this.retStmt();
				}
				break;
			case vikingParser.T__5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 53;
				this.stmtBlock();
				}
				break;
			case vikingParser.T__8:
			case vikingParser.T__14:
			case vikingParser.T__15:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 54;
				this.expr();
				this.state = 55;
				this.match(vikingParser.T__0);
				}
				break;
			case vikingParser.T__0:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 57;
				this.match(vikingParser.T__0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ifStmt(): IfStmtContext {
		let _localctx: IfStmtContext = new IfStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, vikingParser.RULE_ifStmt);
		try {
			this.state = 70;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 60;
				this.match(vikingParser.T__1);
				this.state = 61;
				this.parenExpr();
				this.state = 62;
				this.stmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 64;
				this.match(vikingParser.T__1);
				this.state = 65;
				this.parenExpr();
				this.state = 66;
				this.stmt();
				this.state = 67;
				this.match(vikingParser.T__2);
				this.state = 68;
				this.stmt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whileStmt(): WhileStmtContext {
		let _localctx: WhileStmtContext = new WhileStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, vikingParser.RULE_whileStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			this.match(vikingParser.T__3);
			this.state = 73;
			this.parenExpr();
			this.state = 74;
			this.stmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retStmt(): RetStmtContext {
		let _localctx: RetStmtContext = new RetStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, vikingParser.RULE_retStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 76;
			this.match(vikingParser.T__4);
			this.state = 77;
			this.expr();
			this.state = 78;
			this.match(vikingParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stmtBlock(): StmtBlockContext {
		let _localctx: StmtBlockContext = new StmtBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, vikingParser.RULE_stmtBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 80;
			this.match(vikingParser.T__5);
			this.state = 84;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__1) | (1 << vikingParser.T__3) | (1 << vikingParser.T__4) | (1 << vikingParser.T__5) | (1 << vikingParser.T__8) | (1 << vikingParser.T__14) | (1 << vikingParser.T__15) | (1 << vikingParser.TYPE) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0)) {
				{
				{
				this.state = 81;
				this.stmt();
				}
				}
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 87;
			this.match(vikingParser.T__6);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varDeclStmt(): VarDeclStmtContext {
		let _localctx: VarDeclStmtContext = new VarDeclStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, vikingParser.RULE_varDeclStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 89;
			this.match(vikingParser.TYPE);
			this.state = 90;
			this.match(vikingParser.ID);
			this.state = 91;
			this.match(vikingParser.T__7);
			this.state = 92;
			this.expr();
			this.state = 93;
			this.match(vikingParser.T__0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fnDeclStmt(): FnDeclStmtContext {
		let _localctx: FnDeclStmtContext = new FnDeclStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, vikingParser.RULE_fnDeclStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 95;
			this.match(vikingParser.TYPE);
			this.state = 96;
			this.match(vikingParser.ID);
			this.state = 97;
			this.match(vikingParser.T__8);
			this.state = 108;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vikingParser.TYPE) {
				{
				this.state = 98;
				this.match(vikingParser.TYPE);
				this.state = 99;
				this.match(vikingParser.ID);
				this.state = 105;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__9) {
					{
					{
					this.state = 100;
					this.match(vikingParser.T__9);
					this.state = 101;
					this.match(vikingParser.TYPE);
					this.state = 102;
					this.match(vikingParser.ID);
					}
					}
					this.state = 107;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 110;
			this.match(vikingParser.T__10);
			this.state = 111;
			this.stmt();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parenExpr(): ParenExprContext {
		let _localctx: ParenExprContext = new ParenExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, vikingParser.RULE_parenExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 113;
			this.match(vikingParser.T__8);
			this.state = 114;
			this.expr();
			this.state = 115;
			this.match(vikingParser.T__10);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expr(): ExprContext {
		let _localctx: ExprContext = new ExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, vikingParser.RULE_expr);
		try {
			this.state = 119;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 117;
				this.assignExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 118;
				this.parenExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public assignExpr(): AssignExprContext {
		let _localctx: AssignExprContext = new AssignExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, vikingParser.RULE_assignExpr);
		try {
			this.state = 125;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 121;
				this.relExpr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 122;
				this.match(vikingParser.ID);
				this.state = 123;
				this.match(vikingParser.T__7);
				this.state = 124;
				this.expr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public relExpr(): RelExprContext;
	public relExpr(_p: number): RelExprContext;
	// @RuleVersion(0)
	public relExpr(_p?: number): RelExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: RelExprContext = new RelExprContext(this._ctx, _parentState);
		let _prevctx: RelExprContext = _localctx;
		let _startState: number = 24;
		this.enterRecursionRule(_localctx, 24, vikingParser.RULE_relExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 128;
			this.addExpr(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 135;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new RelExprContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, vikingParser.RULE_relExpr);
					this.state = 130;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 131;
					_la = this._input.LA(1);
					if (!(_la === vikingParser.T__11 || _la === vikingParser.T__12)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 132;
					this.addExpr(0);
					}
					}
				}
				this.state = 137;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public addExpr(): AddExprContext;
	public addExpr(_p: number): AddExprContext;
	// @RuleVersion(0)
	public addExpr(_p?: number): AddExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: AddExprContext = new AddExprContext(this._ctx, _parentState);
		let _prevctx: AddExprContext = _localctx;
		let _startState: number = 26;
		this.enterRecursionRule(_localctx, 26, vikingParser.RULE_addExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 139;
			this.negExpr();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 146;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new AddExprContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, vikingParser.RULE_addExpr);
					this.state = 141;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 142;
					_la = this._input.LA(1);
					if (!(_la === vikingParser.T__13 || _la === vikingParser.T__14)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 143;
					this.negExpr();
					}
					}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public negExpr(): NegExprContext {
		let _localctx: NegExprContext = new NegExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, vikingParser.RULE_negExpr);
		try {
			this.state = 152;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__8:
			case vikingParser.T__15:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 149;
				this.callExpr();
				}
				break;
			case vikingParser.T__14:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 150;
				this.match(vikingParser.T__14);
				this.state = 151;
				this.callExpr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public callExpr(): CallExprContext {
		let _localctx: CallExprContext = new CallExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, vikingParser.RULE_callExpr);
		let _la: number;
		try {
			this.state = 167;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 154;
				this.stringExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 155;
				this.match(vikingParser.ID);
				this.state = 156;
				this.match(vikingParser.T__8);
				this.state = 157;
				this.expr();
				this.state = 162;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__9) {
					{
					{
					this.state = 158;
					this.match(vikingParser.T__9);
					this.state = 159;
					this.expr();
					}
					}
					this.state = 164;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 165;
				this.match(vikingParser.T__10);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringExpr(): StringExprContext {
		let _localctx: StringExprContext = new StringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, vikingParser.RULE_stringExpr);
		try {
			this.state = 171;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 169;
				this.match(vikingParser.STRING);
				}
				break;
			case vikingParser.T__8:
			case vikingParser.T__15:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 170;
				this.arrayExpr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayExpr(): ArrayExprContext {
		let _localctx: ArrayExprContext = new ArrayExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, vikingParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.state = 185;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__15:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 173;
				this.match(vikingParser.T__15);
				this.state = 174;
				this.expr();
				this.state = 179;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__9) {
					{
					{
					this.state = 175;
					this.match(vikingParser.T__9);
					this.state = 176;
					this.expr();
					}
					}
					this.state = 181;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 182;
				this.match(vikingParser.T__16);
				}
				break;
			case vikingParser.T__8:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 184;
				this.arrayAccessExpr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayAccessExpr(): ArrayAccessExprContext {
		let _localctx: ArrayAccessExprContext = new ArrayAccessExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, vikingParser.RULE_arrayAccessExpr);
		try {
			this.state = 193;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 187;
				this.termExpr();
				this.state = 188;
				this.match(vikingParser.T__15);
				this.state = 189;
				this.expr();
				this.state = 190;
				this.match(vikingParser.T__16);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 192;
				this.termExpr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public termExpr(): TermExprContext {
		let _localctx: TermExprContext = new TermExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, vikingParser.RULE_termExpr);
		try {
			this.state = 198;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 195;
				this.match(vikingParser.ID);
				}
				break;
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 196;
				this.match(vikingParser.DIGITS);
				}
				break;
			case vikingParser.T__8:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 197;
				this.parenExpr();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 12:
			return this.relExpr_sempred(_localctx as RelExprContext, predIndex);

		case 13:
			return this.addExpr_sempred(_localctx as AddExprContext, predIndex);
		}
		return true;
	}
	private relExpr_sempred(_localctx: RelExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private addExpr_sempred(_localctx: AddExprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x18\xCB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x03\x02\x06\x02,\n\x02\r\x02\x0E" +
		"\x02-\x03\x03\x03\x03\x05\x032\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04=\n\x04\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05I" +
		"\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x03\b\x03\b\x07\bU\n\b\f\b\x0E\bX\v\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\nj" +
		"\n\n\f\n\x0E\nm\v\n\x05\no\n\n\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03" +
		"\v\x03\f\x03\f\x05\fz\n\f\x03\r\x03\r\x03\r\x03\r\x05\r\x80\n\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\x88\n\x0E\f\x0E\x0E\x0E" +
		"\x8B\v\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\x93" +
		"\n\x0F\f\x0F\x0E\x0F\x96\v\x0F\x03\x10\x03\x10\x03\x10\x05\x10\x9B\n\x10" +
		"\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x07\x11\xA3\n\x11\f\x11" +
		"\x0E\x11\xA6\v\x11\x03\x11\x03\x11\x05\x11\xAA\n\x11\x03\x12\x03\x12\x05" +
		"\x12\xAE\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x07\x13\xB4\n\x13\f\x13" +
		"\x0E\x13\xB7\v\x13\x03\x13\x03\x13\x03\x13\x05\x13\xBC\n\x13\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xC4\n\x14\x03\x15\x03\x15" +
		"\x03\x15\x05\x15\xC9\n\x15\x03\x15\x02\x02\x04\x1A\x1C\x16\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02\x02\x04\x03" +
		"\x02\x0E\x0F\x03\x02\x10\x11\x02\xCF\x02+\x03\x02\x02\x02\x041\x03\x02" +
		"\x02\x02\x06<\x03\x02\x02\x02\bH\x03\x02\x02\x02\nJ\x03\x02\x02\x02\f" +
		"N\x03\x02\x02\x02\x0ER\x03\x02\x02\x02\x10[\x03\x02\x02\x02\x12a\x03\x02" +
		"\x02\x02\x14s\x03\x02\x02\x02\x16y\x03\x02\x02\x02\x18\x7F\x03\x02\x02" +
		"\x02\x1A\x81\x03\x02\x02\x02\x1C\x8C\x03\x02\x02\x02\x1E\x9A\x03\x02\x02" +
		"\x02 \xA9\x03\x02\x02\x02\"\xAD\x03\x02\x02\x02$\xBB\x03\x02\x02\x02&" +
		"\xC3\x03\x02\x02\x02(\xC8\x03\x02\x02\x02*,\x05\x04\x03\x02+*\x03\x02" +
		"\x02\x02,-\x03\x02\x02\x02-+\x03\x02\x02\x02-.\x03\x02\x02\x02.\x03\x03" +
		"\x02\x02\x02/2\x05\x10\t\x0202\x05\x12\n\x021/\x03\x02\x02\x0210\x03\x02" +
		"\x02\x022\x05\x03\x02\x02\x023=\x05\x10\t\x024=\x05\b\x05\x025=\x05\n" +
		"\x06\x026=\x05\f\x07\x027=\x05\x0E\b\x0289\x05\x16\f\x029:\x07\x03\x02" +
		"\x02:=\x03\x02\x02\x02;=\x07\x03\x02\x02<3\x03\x02\x02\x02<4\x03\x02\x02" +
		"\x02<5\x03\x02\x02\x02<6\x03\x02\x02\x02<7\x03\x02\x02\x02<8\x03\x02\x02" +
		"\x02<;\x03\x02\x02\x02=\x07\x03\x02\x02\x02>?\x07\x04\x02\x02?@\x05\x14" +
		"\v\x02@A\x05\x06\x04\x02AI\x03\x02\x02\x02BC\x07\x04\x02\x02CD\x05\x14" +
		"\v\x02DE\x05\x06\x04\x02EF\x07\x05\x02\x02FG\x05\x06\x04\x02GI\x03\x02" +
		"\x02\x02H>\x03\x02\x02\x02HB\x03\x02\x02\x02I\t\x03\x02\x02\x02JK\x07" +
		"\x06\x02\x02KL\x05\x14\v\x02LM\x05\x06\x04\x02M\v\x03\x02\x02\x02NO\x07" +
		"\x07\x02\x02OP\x05\x16\f\x02PQ\x07\x03\x02\x02Q\r\x03\x02\x02\x02RV\x07" +
		"\b\x02\x02SU\x05\x06\x04\x02TS\x03\x02\x02\x02UX\x03\x02\x02\x02VT\x03" +
		"\x02\x02\x02VW\x03\x02\x02\x02WY\x03\x02\x02\x02XV\x03\x02\x02\x02YZ\x07" +
		"\t\x02\x02Z\x0F\x03\x02\x02\x02[\\\x07\x14\x02\x02\\]\x07\x16\x02\x02" +
		"]^\x07\n\x02\x02^_\x05\x16\f\x02_`\x07\x03\x02\x02`\x11\x03\x02\x02\x02" +
		"ab\x07\x14\x02\x02bc\x07\x16\x02\x02cn\x07\v\x02\x02de\x07\x14\x02\x02" +
		"ek\x07\x16\x02\x02fg\x07\f\x02\x02gh\x07\x14\x02\x02hj\x07\x16\x02\x02" +
		"if\x03\x02\x02\x02jm\x03\x02\x02\x02ki\x03\x02\x02\x02kl\x03\x02\x02\x02" +
		"lo\x03\x02\x02\x02mk\x03\x02\x02\x02nd\x03\x02\x02\x02no\x03\x02\x02\x02" +
		"op\x03\x02\x02\x02pq\x07\r\x02\x02qr\x05\x06\x04\x02r\x13\x03\x02\x02" +
		"\x02st\x07\v\x02\x02tu\x05\x16\f\x02uv\x07\r\x02\x02v\x15\x03\x02\x02" +
		"\x02wz\x05\x18\r\x02xz\x05\x14\v\x02yw\x03\x02\x02\x02yx\x03\x02\x02\x02" +
		"z\x17\x03\x02\x02\x02{\x80\x05\x1A\x0E\x02|}\x07\x16\x02\x02}~\x07\n\x02" +
		"\x02~\x80\x05\x16\f\x02\x7F{\x03\x02\x02\x02\x7F|\x03\x02\x02\x02\x80" +
		"\x19\x03\x02\x02\x02\x81\x82\b\x0E\x01\x02\x82\x83\x05\x1C\x0F\x02\x83" +
		"\x89\x03\x02\x02\x02\x84\x85\f\x03\x02\x02\x85\x86\t\x02\x02\x02\x86\x88" +
		"\x05\x1C\x0F\x02\x87\x84\x03\x02\x02\x02\x88\x8B\x03\x02\x02\x02\x89\x87" +
		"\x03\x02\x02\x02\x89\x8A\x03\x02\x02\x02\x8A\x1B\x03\x02\x02\x02\x8B\x89" +
		"\x03\x02\x02\x02\x8C\x8D\b\x0F\x01\x02\x8D\x8E\x05\x1E\x10\x02\x8E\x94" +
		"\x03\x02\x02\x02\x8F\x90\f\x03\x02\x02\x90\x91\t\x03\x02\x02\x91\x93\x05" +
		"\x1E\x10\x02\x92\x8F\x03\x02\x02\x02\x93\x96\x03\x02\x02\x02\x94\x92\x03" +
		"\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x1D\x03\x02\x02\x02\x96\x94\x03" +
		"\x02\x02\x02\x97\x9B\x05 \x11\x02\x98\x99\x07\x11\x02\x02\x99\x9B\x05" +
		" \x11\x02\x9A\x97\x03\x02\x02\x02\x9A\x98\x03\x02\x02\x02\x9B\x1F\x03" +
		"\x02\x02\x02\x9C\xAA\x05\"\x12\x02\x9D\x9E\x07\x16\x02\x02\x9E\x9F\x07" +
		"\v\x02\x02\x9F\xA4\x05\x16\f\x02\xA0\xA1\x07\f\x02\x02\xA1\xA3\x05\x16" +
		"\f\x02\xA2\xA0\x03\x02\x02\x02\xA3\xA6\x03\x02\x02\x02\xA4\xA2\x03\x02" +
		"\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA7\x03\x02\x02\x02\xA6\xA4\x03\x02" +
		"\x02\x02\xA7\xA8\x07\r\x02\x02\xA8\xAA\x03\x02\x02\x02\xA9\x9C\x03\x02" +
		"\x02\x02\xA9\x9D\x03\x02\x02\x02\xAA!\x03\x02\x02\x02\xAB\xAE\x07\x15" +
		"\x02\x02\xAC\xAE\x05$\x13\x02\xAD\xAB\x03\x02\x02\x02\xAD\xAC\x03\x02" +
		"\x02\x02\xAE#\x03\x02\x02\x02\xAF\xB0\x07\x12\x02\x02\xB0\xB5\x05\x16" +
		"\f\x02\xB1\xB2\x07\f\x02\x02\xB2\xB4\x05\x16\f\x02\xB3\xB1\x03\x02\x02" +
		"\x02\xB4\xB7\x03\x02\x02\x02\xB5\xB3\x03\x02\x02\x02\xB5\xB6\x03\x02\x02" +
		"\x02\xB6\xB8\x03\x02\x02\x02\xB7\xB5\x03\x02\x02\x02\xB8\xB9\x07\x13\x02" +
		"\x02\xB9\xBC\x03\x02\x02\x02\xBA\xBC\x05&\x14\x02\xBB\xAF\x03\x02\x02" +
		"\x02\xBB\xBA\x03\x02\x02\x02\xBC%\x03\x02\x02\x02\xBD\xBE\x05(\x15\x02" +
		"\xBE\xBF\x07\x12\x02\x02\xBF\xC0\x05\x16\f\x02\xC0\xC1\x07\x13\x02\x02" +
		"\xC1\xC4\x03\x02\x02\x02\xC2\xC4\x05(\x15\x02\xC3\xBD\x03\x02\x02\x02" +
		"\xC3\xC2\x03\x02\x02\x02\xC4\'\x03\x02\x02\x02\xC5\xC9\x07\x16\x02\x02" +
		"\xC6\xC9\x07\x17\x02\x02\xC7\xC9\x05\x14\v\x02\xC8\xC5\x03\x02\x02\x02" +
		"\xC8\xC6\x03\x02\x02\x02\xC8\xC7\x03\x02\x02\x02\xC9)\x03\x02\x02\x02" +
		"\x15-1<HVkny\x7F\x89\x94\x9A\xA4\xA9\xAD\xB5\xBB\xC3\xC8";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!vikingParser.__ATN) {
			vikingParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(vikingParser._serializedATN));
		}

		return vikingParser.__ATN;
	}

}

export class EntryContext extends ParserRuleContext {
	public externalStmt(): ExternalStmtContext[];
	public externalStmt(i: number): ExternalStmtContext;
	public externalStmt(i?: number): ExternalStmtContext | ExternalStmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExternalStmtContext);
		} else {
			return this.getRuleContext(i, ExternalStmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_entry; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterEntry) {
			listener.enterEntry(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitEntry) {
			listener.exitEntry(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitEntry) {
			return visitor.visitEntry(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalStmtContext extends ParserRuleContext {
	public varDeclStmt(): VarDeclStmtContext | undefined {
		return this.tryGetRuleContext(0, VarDeclStmtContext);
	}
	public fnDeclStmt(): FnDeclStmtContext | undefined {
		return this.tryGetRuleContext(0, FnDeclStmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_externalStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterExternalStmt) {
			listener.enterExternalStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitExternalStmt) {
			listener.exitExternalStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitExternalStmt) {
			return visitor.visitExternalStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtContext extends ParserRuleContext {
	public varDeclStmt(): VarDeclStmtContext | undefined {
		return this.tryGetRuleContext(0, VarDeclStmtContext);
	}
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	public whileStmt(): WhileStmtContext | undefined {
		return this.tryGetRuleContext(0, WhileStmtContext);
	}
	public retStmt(): RetStmtContext | undefined {
		return this.tryGetRuleContext(0, RetStmtContext);
	}
	public stmtBlock(): StmtBlockContext | undefined {
		return this.tryGetRuleContext(0, StmtBlockContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_stmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterStmt) {
			listener.enterStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitStmt) {
			listener.exitStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitStmt) {
			return visitor.visitStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStmtContext extends ParserRuleContext {
	public parenExpr(): ParenExprContext {
		return this.getRuleContext(0, ParenExprContext);
	}
	public stmt(): StmtContext[];
	public stmt(i: number): StmtContext;
	public stmt(i?: number): StmtContext | StmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtContext);
		} else {
			return this.getRuleContext(i, StmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_ifStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterIfStmt) {
			listener.enterIfStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitIfStmt) {
			listener.exitIfStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitIfStmt) {
			return visitor.visitIfStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhileStmtContext extends ParserRuleContext {
	public parenExpr(): ParenExprContext {
		return this.getRuleContext(0, ParenExprContext);
	}
	public stmt(): StmtContext {
		return this.getRuleContext(0, StmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_whileStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterWhileStmt) {
			listener.enterWhileStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitWhileStmt) {
			listener.exitWhileStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitWhileStmt) {
			return visitor.visitWhileStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RetStmtContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_retStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterRetStmt) {
			listener.enterRetStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitRetStmt) {
			listener.exitRetStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitRetStmt) {
			return visitor.visitRetStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StmtBlockContext extends ParserRuleContext {
	public stmt(): StmtContext[];
	public stmt(i: number): StmtContext;
	public stmt(i?: number): StmtContext | StmtContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StmtContext);
		} else {
			return this.getRuleContext(i, StmtContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_stmtBlock; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterStmtBlock) {
			listener.enterStmtBlock(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitStmtBlock) {
			listener.exitStmtBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitStmtBlock) {
			return visitor.visitStmtBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarDeclStmtContext extends ParserRuleContext {
	public TYPE(): TerminalNode { return this.getToken(vikingParser.TYPE, 0); }
	public ID(): TerminalNode { return this.getToken(vikingParser.ID, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_varDeclStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterVarDeclStmt) {
			listener.enterVarDeclStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitVarDeclStmt) {
			listener.exitVarDeclStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitVarDeclStmt) {
			return visitor.visitVarDeclStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FnDeclStmtContext extends ParserRuleContext {
	public TYPE(): TerminalNode[];
	public TYPE(i: number): TerminalNode;
	public TYPE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vikingParser.TYPE);
		} else {
			return this.getToken(vikingParser.TYPE, i);
		}
	}
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(vikingParser.ID);
		} else {
			return this.getToken(vikingParser.ID, i);
		}
	}
	public stmt(): StmtContext {
		return this.getRuleContext(0, StmtContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_fnDeclStmt; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterFnDeclStmt) {
			listener.enterFnDeclStmt(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitFnDeclStmt) {
			listener.exitFnDeclStmt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitFnDeclStmt) {
			return visitor.visitFnDeclStmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParenExprContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_parenExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterParenExpr) {
			listener.enterParenExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitParenExpr) {
			listener.exitParenExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitParenExpr) {
			return visitor.visitParenExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public assignExpr(): AssignExprContext | undefined {
		return this.tryGetRuleContext(0, AssignExprContext);
	}
	public parenExpr(): ParenExprContext | undefined {
		return this.tryGetRuleContext(0, ParenExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_expr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterExpr) {
			listener.enterExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitExpr) {
			listener.exitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignExprContext extends ParserRuleContext {
	public relExpr(): RelExprContext | undefined {
		return this.tryGetRuleContext(0, RelExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(vikingParser.ID, 0); }
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_assignExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterAssignExpr) {
			listener.enterAssignExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitAssignExpr) {
			listener.exitAssignExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitAssignExpr) {
			return visitor.visitAssignExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelExprContext extends ParserRuleContext {
	public addExpr(): AddExprContext {
		return this.getRuleContext(0, AddExprContext);
	}
	public relExpr(): RelExprContext | undefined {
		return this.tryGetRuleContext(0, RelExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_relExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterRelExpr) {
			listener.enterRelExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitRelExpr) {
			listener.exitRelExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitRelExpr) {
			return visitor.visitRelExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddExprContext extends ParserRuleContext {
	public negExpr(): NegExprContext {
		return this.getRuleContext(0, NegExprContext);
	}
	public addExpr(): AddExprContext | undefined {
		return this.tryGetRuleContext(0, AddExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_addExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterAddExpr) {
			listener.enterAddExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitAddExpr) {
			listener.exitAddExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitAddExpr) {
			return visitor.visitAddExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NegExprContext extends ParserRuleContext {
	public callExpr(): CallExprContext {
		return this.getRuleContext(0, CallExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_negExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterNegExpr) {
			listener.enterNegExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitNegExpr) {
			listener.exitNegExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitNegExpr) {
			return visitor.visitNegExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CallExprContext extends ParserRuleContext {
	public stringExpr(): StringExprContext | undefined {
		return this.tryGetRuleContext(0, StringExprContext);
	}
	public ID(): TerminalNode | undefined { return this.tryGetToken(vikingParser.ID, 0); }
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_callExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterCallExpr) {
			listener.enterCallExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitCallExpr) {
			listener.exitCallExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitCallExpr) {
			return visitor.visitCallExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringExprContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(vikingParser.STRING, 0); }
	public arrayExpr(): ArrayExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_stringExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterStringExpr) {
			listener.enterStringExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitStringExpr) {
			listener.exitStringExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitStringExpr) {
			return visitor.visitStringExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayExprContext extends ParserRuleContext {
	public expr(): ExprContext[];
	public expr(i: number): ExprContext;
	public expr(i?: number): ExprContext | ExprContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExprContext);
		} else {
			return this.getRuleContext(i, ExprContext);
		}
	}
	public arrayAccessExpr(): ArrayAccessExprContext | undefined {
		return this.tryGetRuleContext(0, ArrayAccessExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_arrayExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterArrayExpr) {
			listener.enterArrayExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitArrayExpr) {
			listener.exitArrayExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitArrayExpr) {
			return visitor.visitArrayExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayAccessExprContext extends ParserRuleContext {
	public termExpr(): TermExprContext {
		return this.getRuleContext(0, TermExprContext);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_arrayAccessExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterArrayAccessExpr) {
			listener.enterArrayAccessExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitArrayAccessExpr) {
			listener.exitArrayAccessExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitArrayAccessExpr) {
			return visitor.visitArrayAccessExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermExprContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(vikingParser.ID, 0); }
	public DIGITS(): TerminalNode | undefined { return this.tryGetToken(vikingParser.DIGITS, 0); }
	public parenExpr(): ParenExprContext | undefined {
		return this.tryGetRuleContext(0, ParenExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_termExpr; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterTermExpr) {
			listener.enterTermExpr(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitTermExpr) {
			listener.exitTermExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitTermExpr) {
			return visitor.visitTermExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


