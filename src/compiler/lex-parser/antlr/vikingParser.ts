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
	public static readonly TYPE = 17;
	public static readonly STRING = 18;
	public static readonly ID = 19;
	public static readonly DIGITS = 20;
	public static readonly WS = 21;
	public static readonly RULE_entry = 0;
	public static readonly RULE_externalStmt = 1;
	public static readonly RULE_stmt = 2;
	public static readonly RULE_stmtBlock = 3;
	public static readonly RULE_ifStmt = 4;
	public static readonly RULE_whileStmt = 5;
	public static readonly RULE_varDeclStmt = 6;
	public static readonly RULE_fnDeclStmt = 7;
	public static readonly RULE_parenExpr = 8;
	public static readonly RULE_expr = 9;
	public static readonly RULE_assignExpr = 10;
	public static readonly RULE_relExpr = 11;
	public static readonly RULE_addExpr = 12;
	public static readonly RULE_negExpr = 13;
	public static readonly RULE_callExpr = 14;
	public static readonly RULE_stringExpr = 15;
	public static readonly RULE_arrayExpr = 16;
	public static readonly RULE_arrayAccessExpr = 17;
	public static readonly RULE_termExpr = 18;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"entry", "externalStmt", "stmt", "stmtBlock", "ifStmt", "whileStmt", "varDeclStmt", 
		"fnDeclStmt", "parenExpr", "expr", "assignExpr", "relExpr", "addExpr", 
		"negExpr", "callExpr", "stringExpr", "arrayExpr", "arrayAccessExpr", "termExpr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "'{'", "'}'", "'if'", "'else'", "'while'", "'='", "'('", 
		"','", "')'", "'<'", "'>'", "'+'", "'-'", "'['", "']'", "'int'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "TYPE", "STRING", "ID", "DIGITS", "WS",
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
			this.state = 39;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 38;
				this.externalStmt();
				}
				}
				this.state = 41;
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
			this.state = 45;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 43;
				this.varDeclStmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 44;
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
			this.state = 55;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__3:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 47;
				this.ifStmt();
				}
				break;
			case vikingParser.T__5:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 48;
				this.whileStmt();
				}
				break;
			case vikingParser.T__1:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 49;
				this.stmtBlock();
				}
				break;
			case vikingParser.TYPE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 50;
				this.varDeclStmt();
				}
				break;
			case vikingParser.T__7:
			case vikingParser.T__13:
			case vikingParser.T__14:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 51;
				this.expr();
				this.state = 52;
				this.match(vikingParser.T__0);
				}
				break;
			case vikingParser.T__0:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 54;
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
	public stmtBlock(): StmtBlockContext {
		let _localctx: StmtBlockContext = new StmtBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, vikingParser.RULE_stmtBlock);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 57;
			this.match(vikingParser.T__1);
			this.state = 61;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__1) | (1 << vikingParser.T__3) | (1 << vikingParser.T__5) | (1 << vikingParser.T__7) | (1 << vikingParser.T__13) | (1 << vikingParser.T__14) | (1 << vikingParser.TYPE) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0)) {
				{
				{
				this.state = 58;
				this.stmt();
				}
				}
				this.state = 63;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 64;
			this.match(vikingParser.T__2);
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
		this.enterRule(_localctx, 8, vikingParser.RULE_ifStmt);
		try {
			this.state = 76;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 66;
				this.match(vikingParser.T__3);
				this.state = 67;
				this.parenExpr();
				this.state = 68;
				this.stmt();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 70;
				this.match(vikingParser.T__3);
				this.state = 71;
				this.parenExpr();
				this.state = 72;
				this.stmt();
				this.state = 73;
				this.match(vikingParser.T__4);
				this.state = 74;
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
		this.enterRule(_localctx, 10, vikingParser.RULE_whileStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			this.match(vikingParser.T__5);
			this.state = 79;
			this.parenExpr();
			this.state = 80;
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
	public varDeclStmt(): VarDeclStmtContext {
		let _localctx: VarDeclStmtContext = new VarDeclStmtContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, vikingParser.RULE_varDeclStmt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 82;
			this.match(vikingParser.TYPE);
			this.state = 83;
			this.match(vikingParser.ID);
			this.state = 84;
			this.match(vikingParser.T__6);
			this.state = 85;
			this.expr();
			this.state = 86;
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
		this.enterRule(_localctx, 14, vikingParser.RULE_fnDeclStmt);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 88;
			this.match(vikingParser.TYPE);
			this.state = 89;
			this.match(vikingParser.ID);
			this.state = 90;
			this.match(vikingParser.T__7);
			this.state = 101;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === vikingParser.TYPE) {
				{
				this.state = 91;
				this.match(vikingParser.TYPE);
				this.state = 92;
				this.match(vikingParser.ID);
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__8) {
					{
					{
					this.state = 93;
					this.match(vikingParser.T__8);
					this.state = 94;
					this.match(vikingParser.TYPE);
					this.state = 95;
					this.match(vikingParser.ID);
					}
					}
					this.state = 100;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 103;
			this.match(vikingParser.T__9);
			this.state = 104;
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
		this.enterRule(_localctx, 16, vikingParser.RULE_parenExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 106;
			this.match(vikingParser.T__7);
			this.state = 107;
			this.expr();
			this.state = 108;
			this.match(vikingParser.T__9);
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
		this.enterRule(_localctx, 18, vikingParser.RULE_expr);
		try {
			this.state = 112;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 110;
				this.assignExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 111;
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
		this.enterRule(_localctx, 20, vikingParser.RULE_assignExpr);
		try {
			this.state = 118;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 114;
				this.relExpr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 115;
				this.match(vikingParser.ID);
				this.state = 116;
				this.match(vikingParser.T__6);
				this.state = 117;
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
		let _startState: number = 22;
		this.enterRecursionRule(_localctx, 22, vikingParser.RULE_relExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 121;
			this.addExpr(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 128;
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
					this.state = 123;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 124;
					_la = this._input.LA(1);
					if (!(_la === vikingParser.T__10 || _la === vikingParser.T__11)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 125;
					this.addExpr(0);
					}
					}
				}
				this.state = 130;
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
		let _startState: number = 24;
		this.enterRecursionRule(_localctx, 24, vikingParser.RULE_addExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 132;
			this.negExpr();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 139;
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
					this.state = 134;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 135;
					_la = this._input.LA(1);
					if (!(_la === vikingParser.T__12 || _la === vikingParser.T__13)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 136;
					this.negExpr();
					}
					}
				}
				this.state = 141;
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
		this.enterRule(_localctx, 26, vikingParser.RULE_negExpr);
		try {
			this.state = 145;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__7:
			case vikingParser.T__14:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 142;
				this.callExpr();
				}
				break;
			case vikingParser.T__13:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 143;
				this.match(vikingParser.T__13);
				this.state = 144;
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
		this.enterRule(_localctx, 28, vikingParser.RULE_callExpr);
		let _la: number;
		try {
			this.state = 160;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 147;
				this.stringExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 148;
				this.match(vikingParser.ID);
				this.state = 149;
				this.match(vikingParser.T__7);
				this.state = 150;
				this.expr();
				this.state = 155;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__8) {
					{
					{
					this.state = 151;
					this.match(vikingParser.T__8);
					this.state = 152;
					this.expr();
					}
					}
					this.state = 157;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 158;
				this.match(vikingParser.T__9);
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
		this.enterRule(_localctx, 30, vikingParser.RULE_stringExpr);
		try {
			this.state = 164;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 162;
				this.match(vikingParser.STRING);
				}
				break;
			case vikingParser.T__7:
			case vikingParser.T__14:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 163;
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
		this.enterRule(_localctx, 32, vikingParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.state = 178;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__14:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.match(vikingParser.T__14);
				this.state = 167;
				this.expr();
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__8) {
					{
					{
					this.state = 168;
					this.match(vikingParser.T__8);
					this.state = 169;
					this.expr();
					}
					}
					this.state = 174;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 175;
				this.match(vikingParser.T__15);
				}
				break;
			case vikingParser.T__7:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 177;
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
		this.enterRule(_localctx, 34, vikingParser.RULE_arrayAccessExpr);
		try {
			this.state = 186;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 180;
				this.termExpr();
				this.state = 181;
				this.match(vikingParser.T__14);
				this.state = 182;
				this.expr();
				this.state = 183;
				this.match(vikingParser.T__15);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 185;
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
		this.enterRule(_localctx, 36, vikingParser.RULE_termExpr);
		try {
			this.state = 191;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 188;
				this.match(vikingParser.ID);
				}
				break;
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 189;
				this.match(vikingParser.DIGITS);
				}
				break;
			case vikingParser.T__7:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 190;
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
		case 11:
			return this.relExpr_sempred(_localctx as RelExprContext, predIndex);

		case 12:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x17\xC4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x03\x02\x06\x02*\n\x02\r\x02\x0E\x02+\x03\x03" +
		"\x03\x03\x05\x030\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x05\x04:\n\x04\x03\x05\x03\x05\x07\x05>\n\x05\f\x05\x0E" +
		"\x05A\v\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06O\n\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x03\t\x03\t\x03\t\x07\tc\n\t\f\t\x0E\tf\v\t\x05\th\n\t\x03\t" +
		"\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v\x05\vs\n\v\x03\f\x03" +
		"\f\x03\f\x03\f\x05\fy\n\f\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\x81" +
		"\n\r\f\r\x0E\r\x84\v\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
		"\x07\x0E\x8C\n\x0E\f\x0E\x0E\x0E\x8F\v\x0E\x03\x0F\x03\x0F\x03\x0F\x05" +
		"\x0F\x94\n\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x07\x10" +
		"\x9C\n\x10\f\x10\x0E\x10\x9F\v\x10\x03\x10\x03\x10\x05\x10\xA3\n\x10\x03" +
		"\x11\x03\x11\x05\x11\xA7\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x07\x12" +
		"\xAD\n\x12\f\x12\x0E\x12\xB0\v\x12\x03\x12\x03\x12\x03\x12\x05\x12\xB5" +
		"\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\xBD\n\x13" +
		"\x03\x14\x03\x14\x03\x14\x05\x14\xC2\n\x14\x03\x14\x02\x02\x04\x18\x1A" +
		"\x15\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02" +
		"\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02" +
		"\x02\x04\x03\x02\r\x0E\x03\x02\x0F\x10\x02\xC8\x02)\x03\x02\x02\x02\x04" +
		"/\x03\x02\x02\x02\x069\x03\x02\x02\x02\b;\x03\x02\x02\x02\nN\x03\x02\x02" +
		"\x02\fP\x03\x02\x02\x02\x0ET\x03\x02\x02\x02\x10Z\x03\x02\x02\x02\x12" +
		"l\x03\x02\x02\x02\x14r\x03\x02\x02\x02\x16x\x03\x02\x02\x02\x18z\x03\x02" +
		"\x02\x02\x1A\x85\x03\x02\x02\x02\x1C\x93\x03\x02\x02\x02\x1E\xA2\x03\x02" +
		"\x02\x02 \xA6\x03\x02\x02\x02\"\xB4\x03\x02\x02\x02$\xBC\x03\x02\x02\x02" +
		"&\xC1\x03\x02\x02\x02(*\x05\x04\x03\x02)(\x03\x02\x02\x02*+\x03\x02\x02" +
		"\x02+)\x03\x02\x02\x02+,\x03\x02\x02\x02,\x03\x03\x02\x02\x02-0\x05\x0E" +
		"\b\x02.0\x05\x10\t\x02/-\x03\x02\x02\x02/.\x03\x02\x02\x020\x05\x03\x02" +
		"\x02\x021:\x05\n\x06\x022:\x05\f\x07\x023:\x05\b\x05\x024:\x05\x0E\b\x02" +
		"56\x05\x14\v\x0267\x07\x03\x02\x027:\x03\x02\x02\x028:\x07\x03\x02\x02" +
		"91\x03\x02\x02\x0292\x03\x02\x02\x0293\x03\x02\x02\x0294\x03\x02\x02\x02" +
		"95\x03\x02\x02\x0298\x03\x02\x02\x02:\x07\x03\x02\x02\x02;?\x07\x04\x02" +
		"\x02<>\x05\x06\x04\x02=<\x03\x02\x02\x02>A\x03\x02\x02\x02?=\x03\x02\x02" +
		"\x02?@\x03\x02\x02\x02@B\x03\x02\x02\x02A?\x03\x02\x02\x02BC\x07\x05\x02" +
		"\x02C\t\x03\x02\x02\x02DE\x07\x06\x02\x02EF\x05\x12\n\x02FG\x05\x06\x04" +
		"\x02GO\x03\x02\x02\x02HI\x07\x06\x02\x02IJ\x05\x12\n\x02JK\x05\x06\x04" +
		"\x02KL\x07\x07\x02\x02LM\x05\x06\x04\x02MO\x03\x02\x02\x02ND\x03\x02\x02" +
		"\x02NH\x03\x02\x02\x02O\v\x03\x02\x02\x02PQ\x07\b\x02\x02QR\x05\x12\n" +
		"\x02RS\x05\x06\x04\x02S\r\x03\x02\x02\x02TU\x07\x13\x02\x02UV\x07\x15" +
		"\x02\x02VW\x07\t\x02\x02WX\x05\x14\v\x02XY\x07\x03\x02\x02Y\x0F\x03\x02" +
		"\x02\x02Z[\x07\x13\x02\x02[\\\x07\x15\x02\x02\\g\x07\n\x02\x02]^\x07\x13" +
		"\x02\x02^d\x07\x15\x02\x02_`\x07\v\x02\x02`a\x07\x13\x02\x02ac\x07\x15" +
		"\x02\x02b_\x03\x02\x02\x02cf\x03\x02\x02\x02db\x03\x02\x02\x02de\x03\x02" +
		"\x02\x02eh\x03\x02\x02\x02fd\x03\x02\x02\x02g]\x03\x02\x02\x02gh\x03\x02" +
		"\x02\x02hi\x03\x02\x02\x02ij\x07\f\x02\x02jk\x05\x06\x04\x02k\x11\x03" +
		"\x02\x02\x02lm\x07\n\x02\x02mn\x05\x14\v\x02no\x07\f\x02\x02o\x13\x03" +
		"\x02\x02\x02ps\x05\x16\f\x02qs\x05\x12\n\x02rp\x03\x02\x02\x02rq\x03\x02" +
		"\x02\x02s\x15\x03\x02\x02\x02ty\x05\x18\r\x02uv\x07\x15\x02\x02vw\x07" +
		"\t\x02\x02wy\x05\x14\v\x02xt\x03\x02\x02\x02xu\x03\x02\x02\x02y\x17\x03" +
		"\x02\x02\x02z{\b\r\x01\x02{|\x05\x1A\x0E\x02|\x82\x03\x02\x02\x02}~\f" +
		"\x03\x02\x02~\x7F\t\x02\x02\x02\x7F\x81\x05\x1A\x0E\x02\x80}\x03\x02\x02" +
		"\x02\x81\x84\x03\x02\x02\x02\x82\x80\x03\x02\x02\x02\x82\x83\x03\x02\x02" +
		"\x02\x83\x19\x03\x02\x02\x02\x84\x82\x03\x02\x02\x02\x85\x86\b\x0E\x01" +
		"\x02\x86\x87\x05\x1C\x0F\x02\x87\x8D\x03\x02\x02\x02\x88\x89\f\x03\x02" +
		"\x02\x89\x8A\t\x03\x02\x02\x8A\x8C\x05\x1C\x0F\x02\x8B\x88\x03\x02\x02" +
		"\x02\x8C\x8F\x03\x02\x02\x02\x8D\x8B\x03\x02\x02\x02\x8D\x8E\x03\x02\x02" +
		"\x02\x8E\x1B\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x90\x94\x05\x1E\x10" +
		"\x02\x91\x92\x07\x10\x02\x02\x92\x94\x05\x1E\x10\x02\x93\x90\x03\x02\x02" +
		"\x02\x93\x91\x03\x02\x02\x02\x94\x1D\x03\x02\x02\x02\x95\xA3\x05 \x11" +
		"\x02\x96\x97\x07\x15\x02\x02\x97\x98\x07\n\x02\x02\x98\x9D\x05\x14\v\x02" +
		"\x99\x9A\x07\v\x02\x02\x9A\x9C\x05\x14\v\x02\x9B\x99\x03\x02\x02\x02\x9C" +
		"\x9F\x03\x02\x02\x02\x9D\x9B\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E" +
		"\xA0\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02\xA0\xA1\x07\f\x02\x02\xA1" +
		"\xA3\x03\x02\x02\x02\xA2\x95\x03\x02\x02\x02\xA2\x96\x03\x02\x02\x02\xA3" +
		"\x1F\x03\x02\x02\x02\xA4\xA7\x07\x14\x02\x02\xA5\xA7\x05\"\x12\x02\xA6" +
		"\xA4\x03\x02\x02\x02\xA6\xA5\x03\x02\x02\x02\xA7!\x03\x02\x02\x02\xA8" +
		"\xA9\x07\x11\x02\x02\xA9\xAE\x05\x14\v\x02\xAA\xAB\x07\v\x02\x02\xAB\xAD" +
		"\x05\x14\v\x02\xAC\xAA\x03\x02\x02\x02\xAD\xB0\x03\x02\x02\x02\xAE\xAC" +
		"\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB1\x03\x02\x02\x02\xB0\xAE" +
		"\x03\x02\x02\x02\xB1\xB2\x07\x12\x02\x02\xB2\xB5\x03\x02\x02\x02\xB3\xB5" +
		"\x05$\x13\x02\xB4\xA8\x03\x02\x02\x02\xB4\xB3\x03\x02\x02\x02\xB5#\x03" +
		"\x02\x02\x02\xB6\xB7\x05&\x14\x02\xB7\xB8\x07\x11\x02\x02\xB8\xB9\x05" +
		"\x14\v\x02\xB9\xBA\x07\x12\x02\x02\xBA\xBD\x03\x02\x02\x02\xBB\xBD\x05" +
		"&\x14\x02\xBC\xB6\x03\x02\x02\x02\xBC\xBB\x03\x02\x02\x02\xBD%\x03\x02" +
		"\x02\x02\xBE\xC2\x07\x15\x02\x02\xBF\xC2\x07\x16\x02\x02\xC0\xC2\x05\x12" +
		"\n\x02\xC1\xBE\x03\x02\x02\x02\xC1\xBF\x03\x02\x02\x02\xC1\xC0\x03\x02" +
		"\x02\x02\xC2\'\x03\x02\x02\x02\x15+/9?Ndgrx\x82\x8D\x93\x9D\xA2\xA6\xAE" +
		"\xB4\xBC\xC1";
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
	public ifStmt(): IfStmtContext | undefined {
		return this.tryGetRuleContext(0, IfStmtContext);
	}
	public whileStmt(): WhileStmtContext | undefined {
		return this.tryGetRuleContext(0, WhileStmtContext);
	}
	public stmtBlock(): StmtBlockContext | undefined {
		return this.tryGetRuleContext(0, StmtBlockContext);
	}
	public varDeclStmt(): VarDeclStmtContext | undefined {
		return this.tryGetRuleContext(0, VarDeclStmtContext);
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


