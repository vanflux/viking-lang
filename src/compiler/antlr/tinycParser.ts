// Generated from src/compiler/grammar/tinyc.g4 by ANTLR 4.9.0-SNAPSHOT


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

import { tinycListener } from "./tinycListener";
import { tinycVisitor } from "./tinycVisitor";


export class tinycParser extends Parser {
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
	public static readonly INT = 16;
	public static readonly WS = 17;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_paren_expr = 2;
	public static readonly RULE_expr = 3;
	public static readonly RULE_test = 4;
	public static readonly RULE_sum_ = 5;
	public static readonly RULE_term = 6;
	public static readonly RULE_id_ = 7;
	public static readonly RULE_integer = 8;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "paren_expr", "expr", "test", "sum_", "term", 
		"id_", "integer",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'if'", "'else'", "'while'", "'do'", "';'", "'{'", "'}'", "'print'", 
		"'('", "')'", "'='", "'<'", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "STRING", "INT", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(tinycParser._LITERAL_NAMES, tinycParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return tinycParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "tinyc.g4"; }

	// @Override
	public get ruleNames(): string[] { return tinycParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return tinycParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(tinycParser._ATN, this);
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let _localctx: ProgramContext = new ProgramContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, tinycParser.RULE_program);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 18;
				this.statement();
				}
				}
				this.state = 21;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << tinycParser.T__0) | (1 << tinycParser.T__2) | (1 << tinycParser.T__3) | (1 << tinycParser.T__4) | (1 << tinycParser.T__5) | (1 << tinycParser.T__7) | (1 << tinycParser.T__8) | (1 << tinycParser.STRING) | (1 << tinycParser.INT))) !== 0));
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
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, tinycParser.RULE_statement);
		let _la: number;
		try {
			this.state = 59;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 23;
				this.match(tinycParser.T__0);
				this.state = 24;
				this.paren_expr();
				this.state = 25;
				this.statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 27;
				this.match(tinycParser.T__0);
				this.state = 28;
				this.paren_expr();
				this.state = 29;
				this.statement();
				this.state = 30;
				this.match(tinycParser.T__1);
				this.state = 31;
				this.statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 33;
				this.match(tinycParser.T__2);
				this.state = 34;
				this.paren_expr();
				this.state = 35;
				this.statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 37;
				this.match(tinycParser.T__3);
				this.state = 38;
				this.statement();
				this.state = 39;
				this.match(tinycParser.T__2);
				this.state = 40;
				this.paren_expr();
				this.state = 41;
				this.match(tinycParser.T__4);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 43;
				this.match(tinycParser.T__5);
				this.state = 47;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << tinycParser.T__0) | (1 << tinycParser.T__2) | (1 << tinycParser.T__3) | (1 << tinycParser.T__4) | (1 << tinycParser.T__5) | (1 << tinycParser.T__7) | (1 << tinycParser.T__8) | (1 << tinycParser.STRING) | (1 << tinycParser.INT))) !== 0)) {
					{
					{
					this.state = 44;
					this.statement();
					}
					}
					this.state = 49;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 50;
				this.match(tinycParser.T__6);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 51;
				this.match(tinycParser.T__7);
				this.state = 52;
				this.paren_expr();
				this.state = 53;
				this.match(tinycParser.T__4);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 55;
				this.expr();
				this.state = 56;
				this.match(tinycParser.T__4);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 58;
				this.match(tinycParser.T__4);
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
	public paren_expr(): Paren_exprContext {
		let _localctx: Paren_exprContext = new Paren_exprContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, tinycParser.RULE_paren_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			this.match(tinycParser.T__8);
			this.state = 62;
			this.expr();
			this.state = 63;
			this.match(tinycParser.T__9);
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
		this.enterRule(_localctx, 6, tinycParser.RULE_expr);
		try {
			this.state = 70;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 65;
				this.test();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 66;
				this.id_();
				this.state = 67;
				this.match(tinycParser.T__10);
				this.state = 68;
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
	// @RuleVersion(0)
	public test(): TestContext {
		let _localctx: TestContext = new TestContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, tinycParser.RULE_test);
		try {
			this.state = 77;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 72;
				this.sum_(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 73;
				this.sum_(0);
				this.state = 74;
				this.match(tinycParser.T__11);
				this.state = 75;
				this.sum_(0);
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

	public sum_(): Sum_Context;
	public sum_(_p: number): Sum_Context;
	// @RuleVersion(0)
	public sum_(_p?: number): Sum_Context {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: Sum_Context = new Sum_Context(this._ctx, _parentState);
		let _prevctx: Sum_Context = _localctx;
		let _startState: number = 10;
		this.enterRecursionRule(_localctx, 10, tinycParser.RULE_sum_, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 80;
			this.term();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 90;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 88;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
					case 1:
						{
						_localctx = new Sum_Context(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, tinycParser.RULE_sum_);
						this.state = 82;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 83;
						this.match(tinycParser.T__12);
						this.state = 84;
						this.term();
						}
						break;

					case 2:
						{
						_localctx = new Sum_Context(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, tinycParser.RULE_sum_);
						this.state = 85;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 86;
						this.match(tinycParser.T__13);
						this.state = 87;
						this.term();
						}
						break;
					}
					}
				}
				this.state = 92;
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
	public term(): TermContext {
		let _localctx: TermContext = new TermContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, tinycParser.RULE_term);
		try {
			this.state = 96;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case tinycParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 93;
				this.id_();
				}
				break;
			case tinycParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 94;
				this.integer();
				}
				break;
			case tinycParser.T__8:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 95;
				this.paren_expr();
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
	public id_(): Id_Context {
		let _localctx: Id_Context = new Id_Context(this._ctx, this.state);
		this.enterRule(_localctx, 14, tinycParser.RULE_id_);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 98;
			this.match(tinycParser.STRING);
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
	public integer(): IntegerContext {
		let _localctx: IntegerContext = new IntegerContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, tinycParser.RULE_integer);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 100;
			this.match(tinycParser.INT);
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
			return this.sum__sempred(_localctx as Sum_Context, predIndex);
		}
		return true;
	}
	private sum__sempred(_localctx: Sum_Context, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);

		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x13i\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x06\x02\x16\n\x02\r\x02\x0E" +
		"\x02\x17\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x030\n\x03\f\x03\x0E\x03" +
		"3\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x05\x03>\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x03\x05\x05\x05I\n\x05\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x05\x06P\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x07\x07[\n\x07\f\x07\x0E\x07^\v\x07\x03\b\x03" +
		"\b\x03\b\x05\bc\n\b\x03\t\x03\t\x03\n\x03\n\x03\n\x02\x02\x03\f\v\x02" +
		"\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x02\x02" +
		"\x02n\x02\x15\x03\x02\x02\x02\x04=\x03\x02\x02\x02\x06?\x03\x02\x02\x02" +
		"\bH\x03\x02\x02\x02\nO\x03\x02\x02\x02\fQ\x03\x02\x02\x02\x0Eb\x03\x02" +
		"\x02\x02\x10d\x03\x02\x02\x02\x12f\x03\x02\x02\x02\x14\x16\x05\x04\x03" +
		"\x02\x15\x14\x03\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x15\x03\x02\x02" +
		"\x02\x17\x18\x03\x02\x02\x02\x18\x03\x03\x02\x02\x02\x19\x1A\x07\x03\x02" +
		"\x02\x1A\x1B\x05\x06\x04\x02\x1B\x1C\x05\x04\x03\x02\x1C>\x03\x02\x02" +
		"\x02\x1D\x1E\x07\x03\x02\x02\x1E\x1F\x05\x06\x04\x02\x1F \x05\x04\x03" +
		"\x02 !\x07\x04\x02\x02!\"\x05\x04\x03\x02\">\x03\x02\x02\x02#$\x07\x05" +
		"\x02\x02$%\x05\x06\x04\x02%&\x05\x04\x03\x02&>\x03\x02\x02\x02\'(\x07" +
		"\x06\x02\x02()\x05\x04\x03\x02)*\x07\x05\x02\x02*+\x05\x06\x04\x02+,\x07" +
		"\x07\x02\x02,>\x03\x02\x02\x02-1\x07\b\x02\x02.0\x05\x04\x03\x02/.\x03" +
		"\x02\x02\x0203\x03\x02\x02\x021/\x03\x02\x02\x0212\x03\x02\x02\x0224\x03" +
		"\x02\x02\x0231\x03\x02\x02\x024>\x07\t\x02\x0256\x07\n\x02\x0267\x05\x06" +
		"\x04\x0278\x07\x07\x02\x028>\x03\x02\x02\x029:\x05\b\x05\x02:;\x07\x07" +
		"\x02\x02;>\x03\x02\x02\x02<>\x07\x07\x02\x02=\x19\x03\x02\x02\x02=\x1D" +
		"\x03\x02\x02\x02=#\x03\x02\x02\x02=\'\x03\x02\x02\x02=-\x03\x02\x02\x02" +
		"=5\x03\x02\x02\x02=9\x03\x02\x02\x02=<\x03\x02\x02\x02>\x05\x03\x02\x02" +
		"\x02?@\x07\v\x02\x02@A\x05\b\x05\x02AB\x07\f\x02\x02B\x07\x03\x02\x02" +
		"\x02CI\x05\n\x06\x02DE\x05\x10\t\x02EF\x07\r\x02\x02FG\x05\b\x05\x02G" +
		"I\x03\x02\x02\x02HC\x03\x02\x02\x02HD\x03\x02\x02\x02I\t\x03\x02\x02\x02" +
		"JP\x05\f\x07\x02KL\x05\f\x07\x02LM\x07\x0E\x02\x02MN\x05\f\x07\x02NP\x03" +
		"\x02\x02\x02OJ\x03\x02\x02\x02OK\x03\x02\x02\x02P\v\x03\x02\x02\x02QR" +
		"\b\x07\x01\x02RS\x05\x0E\b\x02S\\\x03\x02\x02\x02TU\f\x04\x02\x02UV\x07" +
		"\x0F\x02\x02V[\x05\x0E\b\x02WX\f\x03\x02\x02XY\x07\x10\x02\x02Y[\x05\x0E" +
		"\b\x02ZT\x03\x02\x02\x02ZW\x03\x02\x02\x02[^\x03\x02\x02\x02\\Z\x03\x02" +
		"\x02\x02\\]\x03\x02\x02\x02]\r\x03\x02\x02\x02^\\\x03\x02\x02\x02_c\x05" +
		"\x10\t\x02`c\x05\x12\n\x02ac\x05\x06\x04\x02b_\x03\x02\x02\x02b`\x03\x02" +
		"\x02\x02ba\x03\x02\x02\x02c\x0F\x03\x02\x02\x02de\x07\x11\x02\x02e\x11" +
		"\x03\x02\x02\x02fg\x07\x12\x02\x02g\x13\x03\x02\x02\x02\n\x171=HOZ\\b";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!tinycParser.__ATN) {
			tinycParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(tinycParser._serializedATN));
		}

		return tinycParser.__ATN;
	}

}

export class ProgramContext extends ParserRuleContext {
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_program; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterProgram) {
			listener.enterProgram(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitProgram) {
			listener.exitProgram(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitProgram) {
			return visitor.visitProgram(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public paren_expr(): Paren_exprContext | undefined {
		return this.tryGetRuleContext(0, Paren_exprContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_statement; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Paren_exprContext extends ParserRuleContext {
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_paren_expr; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterParen_expr) {
			listener.enterParen_expr(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitParen_expr) {
			listener.exitParen_expr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitParen_expr) {
			return visitor.visitParen_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	public test(): TestContext | undefined {
		return this.tryGetRuleContext(0, TestContext);
	}
	public id_(): Id_Context | undefined {
		return this.tryGetRuleContext(0, Id_Context);
	}
	public expr(): ExprContext | undefined {
		return this.tryGetRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_expr; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterExpr) {
			listener.enterExpr(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitExpr) {
			listener.exitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TestContext extends ParserRuleContext {
	public sum_(): Sum_Context[];
	public sum_(i: number): Sum_Context;
	public sum_(i?: number): Sum_Context | Sum_Context[] {
		if (i === undefined) {
			return this.getRuleContexts(Sum_Context);
		} else {
			return this.getRuleContext(i, Sum_Context);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_test; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterTest) {
			listener.enterTest(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitTest) {
			listener.exitTest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitTest) {
			return visitor.visitTest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sum_Context extends ParserRuleContext {
	public term(): TermContext {
		return this.getRuleContext(0, TermContext);
	}
	public sum_(): Sum_Context | undefined {
		return this.tryGetRuleContext(0, Sum_Context);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_sum_; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterSum_) {
			listener.enterSum_(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitSum_) {
			listener.exitSum_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitSum_) {
			return visitor.visitSum_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	public id_(): Id_Context | undefined {
		return this.tryGetRuleContext(0, Id_Context);
	}
	public integer(): IntegerContext | undefined {
		return this.tryGetRuleContext(0, IntegerContext);
	}
	public paren_expr(): Paren_exprContext | undefined {
		return this.tryGetRuleContext(0, Paren_exprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_term; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterTerm) {
			listener.enterTerm(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitTerm) {
			listener.exitTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitTerm) {
			return visitor.visitTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Id_Context extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(tinycParser.STRING, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_id_; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterId_) {
			listener.enterId_(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitId_) {
			listener.exitId_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitId_) {
			return visitor.visitId_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerContext extends ParserRuleContext {
	public INT(): TerminalNode { return this.getToken(tinycParser.INT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_integer; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterInteger) {
			listener.enterInteger(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitInteger) {
			listener.exitInteger(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitInteger) {
			return visitor.visitInteger(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


