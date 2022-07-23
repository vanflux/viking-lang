// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly STRING = 15;
	public static readonly ID = 16;
	public static readonly DIGITS = 17;
	public static readonly WS = 18;
	public static readonly RULE_entry = 0;
	public static readonly RULE_stat = 1;
	public static readonly RULE_parenExpr = 2;
	public static readonly RULE_expr = 3;
	public static readonly RULE_assignExpr = 4;
	public static readonly RULE_relExpr = 5;
	public static readonly RULE_addExpr = 6;
	public static readonly RULE_negExpr = 7;
	public static readonly RULE_callExpr = 8;
	public static readonly RULE_termExpr = 9;
	public static readonly RULE_stringExpr = 10;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"entry", "stat", "parenExpr", "expr", "assignExpr", "relExpr", "addExpr", 
		"negExpr", "callExpr", "termExpr", "stringExpr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'if'", "'else'", "'while'", "'{'", "'}'", "';'", "'('", "')'", 
		"'='", "'<'", "'>'", "'+'", "'-'", "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "STRING", "ID", "DIGITS", "WS",
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
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 22;
				this.stat();
				}
				}
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__2) | (1 << vikingParser.T__3) | (1 << vikingParser.T__5) | (1 << vikingParser.T__6) | (1 << vikingParser.T__12) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0));
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
			this.state = 53;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 27;
				this.match(vikingParser.T__0);
				this.state = 28;
				this.parenExpr();
				this.state = 29;
				this.stat();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 31;
				this.match(vikingParser.T__0);
				this.state = 32;
				this.parenExpr();
				this.state = 33;
				this.stat();
				this.state = 34;
				this.match(vikingParser.T__1);
				this.state = 35;
				this.stat();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 37;
				this.match(vikingParser.T__2);
				this.state = 38;
				this.parenExpr();
				this.state = 39;
				this.stat();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 41;
				this.match(vikingParser.T__3);
				this.state = 45;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << vikingParser.T__0) | (1 << vikingParser.T__2) | (1 << vikingParser.T__3) | (1 << vikingParser.T__5) | (1 << vikingParser.T__6) | (1 << vikingParser.T__12) | (1 << vikingParser.STRING) | (1 << vikingParser.ID) | (1 << vikingParser.DIGITS))) !== 0)) {
					{
					{
					this.state = 42;
					this.stat();
					}
					}
					this.state = 47;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 48;
				this.match(vikingParser.T__4);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 49;
				this.expr();
				this.state = 50;
				this.match(vikingParser.T__5);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 52;
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
			this.state = 55;
			this.match(vikingParser.T__6);
			this.state = 56;
			this.expr();
			this.state = 57;
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
			this.state = 61;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 59;
				this.assignExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 60;
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
			this.state = 67;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 63;
				this.relExpr(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 64;
				this.match(vikingParser.ID);
				this.state = 65;
				this.match(vikingParser.T__8);
				this.state = 66;
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
			this.state = 70;
			this.addExpr(0);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 77;
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
					this.state = 72;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 73;
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
					this.state = 74;
					this.addExpr(0);
					}
					}
				}
				this.state = 79;
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
			this.state = 81;
			this.negExpr();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 88;
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
					this.state = 83;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 84;
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
					this.state = 85;
					this.negExpr();
					}
					}
				}
				this.state = 90;
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
			this.state = 94;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.T__6:
			case vikingParser.STRING:
			case vikingParser.ID:
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 91;
				this.callExpr();
				}
				break;
			case vikingParser.T__12:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 92;
				this.match(vikingParser.T__12);
				this.state = 93;
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
			this.state = 109;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 96;
				this.termExpr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 97;
				this.match(vikingParser.ID);
				this.state = 98;
				this.match(vikingParser.T__6);
				this.state = 99;
				this.expr();
				this.state = 104;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === vikingParser.T__13) {
					{
					{
					this.state = 100;
					this.match(vikingParser.T__13);
					this.state = 101;
					this.expr();
					}
					}
					this.state = 106;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 107;
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
	public termExpr(): TermExprContext {
		let _localctx: TermExprContext = new TermExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, vikingParser.RULE_termExpr);
		try {
			this.state = 114;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 111;
				this.match(vikingParser.ID);
				}
				break;
			case vikingParser.DIGITS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 112;
				this.match(vikingParser.DIGITS);
				}
				break;
			case vikingParser.T__6:
			case vikingParser.STRING:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 113;
				this.stringExpr();
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
	public stringExpr(): StringExprContext {
		let _localctx: StringExprContext = new StringExprContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, vikingParser.RULE_stringExpr);
		try {
			this.state = 118;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case vikingParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 116;
				this.match(vikingParser.STRING);
				}
				break;
			case vikingParser.T__6:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 117;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x14{\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x03\x02\x06\x02" +
		"\x1A\n\x02\r\x02\x0E\x02\x1B\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x07\x03.\n\x03\f\x03\x0E\x031\v\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x05\x038\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05" +
		"\x03\x05\x05\x05@\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06F\n\x06" +
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07N\n\x07\f\x07" +
		"\x0E\x07Q\v\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x07\bY\n\b\f\b\x0E" +
		"\b\\\v\b\x03\t\x03\t\x03\t\x05\ta\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x07\ni\n\n\f\n\x0E\nl\v\n\x03\n\x03\n\x05\np\n\n\x03\v\x03\v\x03\v" +
		"\x05\vu\n\v\x03\f\x03\f\x05\fy\n\f\x03\f\x02\x02\x04\f\x0E\r\x02\x02\x04" +
		"\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02" +
		"\x02\x04\x03\x02\f\r\x03\x02\x0E\x0F\x02\x80\x02\x19\x03\x02\x02\x02\x04" +
		"7\x03\x02\x02\x02\x069\x03\x02\x02\x02\b?\x03\x02\x02\x02\nE\x03\x02\x02" +
		"\x02\fG\x03\x02\x02\x02\x0ER\x03\x02\x02\x02\x10`\x03\x02\x02\x02\x12" +
		"o\x03\x02\x02\x02\x14t\x03\x02\x02\x02\x16x\x03\x02\x02\x02\x18\x1A\x05" +
		"\x04\x03\x02\x19\x18\x03\x02\x02\x02\x1A\x1B\x03\x02\x02\x02\x1B\x19\x03" +
		"\x02\x02\x02\x1B\x1C\x03\x02\x02\x02\x1C\x03\x03\x02\x02\x02\x1D\x1E\x07" +
		"\x03\x02\x02\x1E\x1F\x05\x06\x04\x02\x1F \x05\x04\x03\x02 8\x03\x02\x02" +
		"\x02!\"\x07\x03\x02\x02\"#\x05\x06\x04\x02#$\x05\x04\x03\x02$%\x07\x04" +
		"\x02\x02%&\x05\x04\x03\x02&8\x03\x02\x02\x02\'(\x07\x05\x02\x02()\x05" +
		"\x06\x04\x02)*\x05\x04\x03\x02*8\x03\x02\x02\x02+/\x07\x06\x02\x02,.\x05" +
		"\x04\x03\x02-,\x03\x02\x02\x02.1\x03\x02\x02\x02/-\x03\x02\x02\x02/0\x03" +
		"\x02\x02\x0202\x03\x02\x02\x021/\x03\x02\x02\x0228\x07\x07\x02\x0234\x05" +
		"\b\x05\x0245\x07\b\x02\x0258\x03\x02\x02\x0268\x07\b\x02\x027\x1D\x03" +
		"\x02\x02\x027!\x03\x02\x02\x027\'\x03\x02\x02\x027+\x03\x02\x02\x0273" +
		"\x03\x02\x02\x0276\x03\x02\x02\x028\x05\x03\x02\x02\x029:\x07\t\x02\x02" +
		":;\x05\b\x05\x02;<\x07\n\x02\x02<\x07\x03\x02\x02\x02=@\x05\n\x06\x02" +
		">@\x05\x06\x04\x02?=\x03\x02\x02\x02?>\x03\x02\x02\x02@\t\x03\x02\x02" +
		"\x02AF\x05\f\x07\x02BC\x07\x12\x02\x02CD\x07\v\x02\x02DF\x05\b\x05\x02" +
		"EA\x03\x02\x02\x02EB\x03\x02\x02\x02F\v\x03\x02\x02\x02GH\b\x07\x01\x02" +
		"HI\x05\x0E\b\x02IO\x03\x02\x02\x02JK\f\x03\x02\x02KL\t\x02\x02\x02LN\x05" +
		"\x0E\b\x02MJ\x03\x02\x02\x02NQ\x03\x02\x02\x02OM\x03\x02\x02\x02OP\x03" +
		"\x02\x02\x02P\r\x03\x02\x02\x02QO\x03\x02\x02\x02RS\b\b\x01\x02ST\x05" +
		"\x10\t\x02TZ\x03\x02\x02\x02UV\f\x03\x02\x02VW\t\x03\x02\x02WY\x05\x10" +
		"\t\x02XU\x03\x02\x02\x02Y\\\x03\x02\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02" +
		"\x02\x02[\x0F\x03\x02\x02\x02\\Z\x03\x02\x02\x02]a\x05\x12\n\x02^_\x07" +
		"\x0F\x02\x02_a\x05\x12\n\x02`]\x03\x02\x02\x02`^\x03\x02\x02\x02a\x11" +
		"\x03\x02\x02\x02bp\x05\x14\v\x02cd\x07\x12\x02\x02de\x07\t\x02\x02ej\x05" +
		"\b\x05\x02fg\x07\x10\x02\x02gi\x05\b\x05\x02hf\x03\x02\x02\x02il\x03\x02" +
		"\x02\x02jh\x03\x02\x02\x02jk\x03\x02\x02\x02km\x03\x02\x02\x02lj\x03\x02" +
		"\x02\x02mn\x07\n\x02\x02np\x03\x02\x02\x02ob\x03\x02\x02\x02oc\x03\x02" +
		"\x02\x02p\x13\x03\x02\x02\x02qu\x07\x12\x02\x02ru\x07\x13\x02\x02su\x05" +
		"\x16\f\x02tq\x03\x02\x02\x02tr\x03\x02\x02\x02ts\x03\x02\x02\x02u\x15" +
		"\x03\x02\x02\x02vy\x07\x11\x02\x02wy\x05\x06\x04\x02xv\x03\x02\x02\x02" +
		"xw\x03\x02\x02\x02y\x17\x03\x02\x02\x02\x0E\x1B/7?EOZ`jotx";
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
	public termExpr(): TermExprContext | undefined {
		return this.tryGetRuleContext(0, TermExprContext);
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


export class TermExprContext extends ParserRuleContext {
	public ID(): TerminalNode | undefined { return this.tryGetToken(vikingParser.ID, 0); }
	public DIGITS(): TerminalNode | undefined { return this.tryGetToken(vikingParser.DIGITS, 0); }
	public stringExpr(): StringExprContext | undefined {
		return this.tryGetRuleContext(0, StringExprContext);
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


export class StringExprContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(vikingParser.STRING, 0); }
	public parenExpr(): ParenExprContext | undefined {
		return this.tryGetRuleContext(0, ParenExprContext);
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


