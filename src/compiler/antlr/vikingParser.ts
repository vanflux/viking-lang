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
	public static readonly STRING = 17;
	public static readonly ID = 18;
	public static readonly DIGITS = 19;
	public static readonly WS = 20;
	public static readonly RULE_entry = 0;
	public static readonly RULE_stat = 1;
	public static readonly RULE_parenExpr = 2;
	public static readonly RULE_expr = 3;
	public static readonly RULE_assignExpr = 4;
	public static readonly RULE_relExpr = 5;
	public static readonly RULE_addExpr = 6;
	public static readonly RULE_negExpr = 7;
	public static readonly RULE_callExpr = 8;
	public static readonly RULE_stringExpr = 9;
	public static readonly RULE_arrayExpr = 10;
	public static readonly RULE_arrayAccessExpr = 11;
	public static readonly RULE_termExpr = 12;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"entry", "stat", "parenExpr", "expr", "assignExpr", "relExpr", "addExpr", 
		"negExpr", "callExpr", "stringExpr", "arrayExpr", "arrayAccessExpr", "termExpr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'if'", "'else'", "'while'", "'{'", "'}'", "';'", "'('", "')'", 
		"'='", "'<'", "'>'", "'+'", "'-'", "','", "'['", "']'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "STRING", "ID", "DIGITS", "WS",
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
			this.state = 27;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 26;
				this.stat();
				}
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__2) | (1 << vikingParser.T__3) | (1 << vikingParser.T__5) | (1 << vikingParser.T__6) | (1 << vikingParser.T__12) | (1 << vikingParser.T__14) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0));
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
	public stat(): StatContext {
		let _localctx: StatContext = new StatContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, vikingParser.RULE_stat);
		let _la: number;
		try {
			this.state = 57;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 31;
				this.match(vikingParser.T__0);
				this.state = 32;
				this.parenExpr();
				this.state = 33;
				this.stat();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 35;
				this.match(vikingParser.T__0);
				this.state = 36;
				this.parenExpr();
				this.state = 37;
				this.stat();
				this.state = 38;
				this.match(vikingParser.T__1);
				this.state = 39;
				this.stat();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 41;
				this.match(vikingParser.T__2);
				this.state = 42;
				this.parenExpr();
				this.state = 43;
				this.stat();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 45;
				this.match(vikingParser.T__3);
				this.state = 49;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__2) | (1 << vikingParser.T__3) | (1 << vikingParser.T__5) | (1 << vikingParser.T__6) | (1 << vikingParser.T__12) | (1 << vikingParser.T__14) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0)) {
					{
					{
					this.state = 46;
					this.stat();
					}
					}
					this.state = 51;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 52;
				this.match(vikingParser.T__4);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 53;
				this.expr();
				this.state = 54;
				this.match(vikingParser.T__5);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 56;
				this.match(vikingParser.T__5);
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
	public parenExpr(): ParenExprContext {
		let _localctx: ParenExprContext = new ParenExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, vikingParser.RULE_parenExpr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 59;
			this.match(vikingParser.T__6);
			this.state = 60;
			this.expr();
			this.state = 61;
			this.match(vikingParser.T__7);
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
		this.enterRule(_localctx, 6, vikingParser.RULE_expr);
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 63;
				this.assignExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 64;
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
		this.enterRule(_localctx, 8, vikingParser.RULE_assignExpr);
		try {
			this.state = 71;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 67;
				this.relExpr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 68;
				this.match(vikingParser.ID);
				this.state = 69;
				this.match(vikingParser.T__8);
				this.state = 70;
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
		let _startState: number = 10;
		this.enterRecursionRule(_localctx, 10, vikingParser.RULE_relExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 74;
			this.addExpr(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 81;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
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
					this.state = 76;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 77;
					_la = this._input.LA(1);
					if (!(_la === vikingParser.T__9 || _la === vikingParser.T__10)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 78;
					this.addExpr(0);
					}
					}
				}
				this.state = 83;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
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
		let _startState: number = 12;
		this.enterRecursionRule(_localctx, 12, vikingParser.RULE_addExpr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 85;
			this.negExpr();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 92;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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
					this.state = 87;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 88;
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
					this.state = 89;
					this.negExpr();
					}
					}
				}
				this.state = 94;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
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
		this.enterRule(_localctx, 14, vikingParser.RULE_negExpr);
		try {
			this.state = 98;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__6:
			case vikingParser.T__14:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 95;
				this.callExpr();
				}
				break;
			case vikingParser.T__12:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 96;
				this.match(vikingParser.T__12);
				this.state = 97;
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
		this.enterRule(_localctx, 16, vikingParser.RULE_callExpr);
		let _la: number;
		try {
			this.state = 113;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 100;
				this.stringExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 101;
				this.match(vikingParser.ID);
				this.state = 102;
				this.match(vikingParser.T__6);
				this.state = 103;
				this.expr();
				this.state = 108;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__13) {
					{
					{
					this.state = 104;
					this.match(vikingParser.T__13);
					this.state = 105;
					this.expr();
					}
					}
					this.state = 110;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 111;
				this.match(vikingParser.T__7);
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
		this.enterRule(_localctx, 18, vikingParser.RULE_stringExpr);
		try {
			this.state = 117;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 115;
				this.match(vikingParser.STRING);
				}
				break;
			case vikingParser.T__6:
			case vikingParser.T__14:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 116;
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
		this.enterRule(_localctx, 20, vikingParser.RULE_arrayExpr);
		let _la: number;
		try {
			this.state = 131;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__14:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 119;
				this.match(vikingParser.T__14);
				this.state = 120;
				this.expr();
				this.state = 125;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__13) {
					{
					{
					this.state = 121;
					this.match(vikingParser.T__13);
					this.state = 122;
					this.expr();
					}
					}
					this.state = 127;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 128;
				this.match(vikingParser.T__15);
				}
				break;
			case vikingParser.T__6:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 130;
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
		this.enterRule(_localctx, 22, vikingParser.RULE_arrayAccessExpr);
		try {
			this.state = 139;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 133;
				this.termExpr();
				this.state = 134;
				this.match(vikingParser.T__14);
				this.state = 135;
				this.expr();
				this.state = 136;
				this.match(vikingParser.T__15);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 138;
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
		this.enterRule(_localctx, 24, vikingParser.RULE_termExpr);
		try {
			this.state = 144;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 141;
				this.match(vikingParser.ID);
				}
				break;
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 142;
				this.match(vikingParser.DIGITS);
				}
				break;
			case vikingParser.T__6:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 143;
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
		case 5:
			return this.relExpr_sempred(_localctx as RelExprContext, predIndex);

		case 6:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x16\x95\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x03\x02\x06\x02\x1E\n\x02\r\x02\x0E\x02\x1F\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x032\n\x03\f\x03\x0E\x03" +
		"5\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03<\n\x03\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x05\x05D\n\x05\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x05\x06J\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x03\x07\x07\x07R\n\x07\f\x07\x0E\x07U\v\x07\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x07\b]\n\b\f\b\x0E\b`\v\b\x03\t\x03\t\x03\t\x05\te\n\t\x03\n" +
		"\x03\n\x03\n\x03\n\x03\n\x03\n\x07\nm\n\n\f\n\x0E\np\v\n\x03\n\x03\n\x05" +
		"\nt\n\n\x03\v\x03\v\x05\vx\n\v\x03\f\x03\f\x03\f\x03\f\x07\f~\n\f\f\f" +
		"\x0E\f\x81\v\f\x03\f\x03\f\x03\f\x05\f\x86\n\f\x03\r\x03\r\x03\r\x03\r" +
		"\x03\r\x03\r\x05\r\x8E\n\r\x03\x0E\x03\x0E\x03\x0E\x05\x0E\x93\n\x0E\x03" +
		"\x0E\x02\x02\x04\f\x0E\x0F\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x02\x04\x03\x02\f" +
		"\r\x03\x02\x0E\x0F\x02\x9B\x02\x1D\x03\x02\x02\x02\x04;\x03\x02\x02\x02" +
		"\x06=\x03\x02\x02\x02\bC\x03\x02\x02\x02\nI\x03\x02\x02\x02\fK\x03\x02" +
		"\x02\x02\x0EV\x03\x02\x02\x02\x10d\x03\x02\x02\x02\x12s\x03\x02\x02\x02" +
		"\x14w\x03\x02\x02\x02\x16\x85\x03\x02\x02\x02\x18\x8D\x03\x02\x02\x02" +
		"\x1A\x92\x03\x02\x02\x02\x1C\x1E\x05\x04\x03\x02\x1D\x1C\x03\x02\x02\x02" +
		"\x1E\x1F\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F \x03\x02\x02\x02" +
		" \x03\x03\x02\x02\x02!\"\x07\x03\x02\x02\"#\x05\x06\x04\x02#$\x05\x04" +
		"\x03\x02$<\x03\x02\x02\x02%&\x07\x03\x02\x02&\'\x05\x06\x04\x02\'(\x05" +
		"\x04\x03\x02()\x07\x04\x02\x02)*\x05\x04\x03\x02*<\x03\x02\x02\x02+,\x07" +
		"\x05\x02\x02,-\x05\x06\x04\x02-.\x05\x04\x03\x02.<\x03\x02\x02\x02/3\x07" +
		"\x06\x02\x0202\x05\x04\x03\x0210\x03\x02\x02\x0225\x03\x02\x02\x0231\x03" +
		"\x02\x02\x0234\x03\x02\x02\x0246\x03\x02\x02\x0253\x03\x02\x02\x026<\x07" +
		"\x07\x02\x0278\x05\b\x05\x0289\x07\b\x02\x029<\x03\x02\x02\x02:<\x07\b" +
		"\x02\x02;!\x03\x02\x02\x02;%\x03\x02\x02\x02;+\x03\x02\x02\x02;/\x03\x02" +
		"\x02\x02;7\x03\x02\x02\x02;:\x03\x02\x02\x02<\x05\x03\x02\x02\x02=>\x07" +
		"\t\x02\x02>?\x05\b\x05\x02?@\x07\n\x02\x02@\x07\x03\x02\x02\x02AD\x05" +
		"\n\x06\x02BD\x05\x06\x04\x02CA\x03\x02\x02\x02CB\x03\x02\x02\x02D\t\x03" +
		"\x02\x02\x02EJ\x05\f\x07\x02FG\x07\x14\x02\x02GH\x07\v\x02\x02HJ\x05\b" +
		"\x05\x02IE\x03\x02\x02\x02IF\x03\x02\x02\x02J\v\x03\x02\x02\x02KL\b\x07" +
		"\x01\x02LM\x05\x0E\b\x02MS\x03\x02\x02\x02NO\f\x03\x02\x02OP\t\x02\x02" +
		"\x02PR\x05\x0E\b\x02QN\x03\x02\x02\x02RU\x03\x02\x02\x02SQ\x03\x02\x02" +
		"\x02ST\x03\x02\x02\x02T\r\x03\x02\x02\x02US\x03\x02\x02\x02VW\b\b\x01" +
		"\x02WX\x05\x10\t\x02X^\x03\x02\x02\x02YZ\f\x03\x02\x02Z[\t\x03\x02\x02" +
		"[]\x05\x10\t\x02\\Y\x03\x02\x02\x02]`\x03\x02\x02\x02^\\\x03\x02\x02\x02" +
		"^_\x03\x02\x02\x02_\x0F\x03\x02\x02\x02`^\x03\x02\x02\x02ae\x05\x12\n" +
		"\x02bc\x07\x0F\x02\x02ce\x05\x12\n\x02da\x03\x02\x02\x02db\x03\x02\x02" +
		"\x02e\x11\x03\x02\x02\x02ft\x05\x14\v\x02gh\x07\x14\x02\x02hi\x07\t\x02" +
		"\x02in\x05\b\x05\x02jk\x07\x10\x02\x02km\x05\b\x05\x02lj\x03\x02\x02\x02" +
		"mp\x03\x02\x02\x02nl\x03\x02\x02\x02no\x03\x02\x02\x02oq\x03\x02\x02\x02" +
		"pn\x03\x02\x02\x02qr\x07\n\x02\x02rt\x03\x02\x02\x02sf\x03\x02\x02\x02" +
		"sg\x03\x02\x02\x02t\x13\x03\x02\x02\x02ux\x07\x13\x02\x02vx\x05\x16\f" +
		"\x02wu\x03\x02\x02\x02wv\x03\x02\x02\x02x\x15\x03\x02\x02\x02yz\x07\x11" +
		"\x02\x02z\x7F\x05\b\x05\x02{|\x07\x10\x02\x02|~\x05\b\x05\x02}{\x03\x02" +
		"\x02\x02~\x81\x03\x02\x02\x02\x7F}\x03\x02\x02\x02\x7F\x80\x03\x02\x02" +
		"\x02\x80\x82\x03\x02\x02\x02\x81\x7F\x03\x02\x02\x02\x82\x83\x07\x12\x02" +
		"\x02\x83\x86\x03\x02\x02\x02\x84\x86\x05\x18\r\x02\x85y\x03\x02\x02\x02" +
		"\x85\x84\x03\x02\x02\x02\x86\x17\x03\x02\x02\x02\x87\x88\x05\x1A\x0E\x02" +
		"\x88\x89\x07\x11\x02\x02\x89\x8A\x05\b\x05\x02\x8A\x8B\x07\x12\x02\x02" +
		"\x8B\x8E\x03\x02\x02\x02\x8C\x8E\x05\x1A\x0E\x02\x8D\x87\x03\x02\x02\x02" +
		"\x8D\x8C\x03\x02\x02\x02\x8E\x19\x03\x02\x02\x02\x8F\x93\x07\x14\x02\x02" +
		"\x90\x93\x07\x15\x02\x02\x91\x93\x05\x06\x04\x02\x92\x8F\x03\x02\x02\x02" +
		"\x92\x90\x03\x02\x02\x02\x92\x91\x03\x02\x02\x02\x93\x1B\x03\x02\x02\x02" +
		"\x11\x1F3;CIS^dnsw\x7F\x85\x8D\x92";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!vikingParser.__ATN) {
			vikingParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(vikingParser._serializedATN));
		}

		return vikingParser.__ATN;
	}

}

export class EntryContext extends ParserRuleContext {
	public stat(): StatContext[];
	public stat(i: number): StatContext;
	public stat(i?: number): StatContext | StatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatContext);
		} else {
			return this.getRuleContext(i, StatContext);
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


export class StatContext extends ParserRuleContext {
	public parenExpr(): ParenExprContext | undefined {
		return this.tryGetRuleContext(0, ParenExprContext);
	}
	public stat(): StatContext[];
	public stat(i: number): StatContext;
	public stat(i?: number): StatContext | StatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatContext);
		} else {
			return this.getRuleContext(i, StatContext);
		}
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return vikingParser.RULE_stat; }
	// @Override
	public enterRule(listener: vikingListener): void {
		if (listener.enterStat) {
			listener.enterStat(this);
		}
	}
	// @Override
	public exitRule(listener: vikingListener): void {
		if (listener.exitStat) {
			listener.exitStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: vikingVisitor<Result>): Result {
		if (visitor.visitStat) {
			return visitor.visitStat(this);
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


