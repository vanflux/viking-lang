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
	public static readonly STRING = 14;
	public static readonly INT = 15;
	public static readonly WS = 16;
	public static readonly RULE_program = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_function_call = 2;
	public static readonly RULE_paren_expr = 3;
	public static readonly RULE_expr = 4;
	public static readonly RULE_test = 5;
	public static readonly RULE_sum_ = 6;
	public static readonly RULE_term = 7;
	public static readonly RULE_id_ = 8;
	public static readonly RULE_integer = 9;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "statement", "function_call", "paren_expr", "expr", "test", 
		"sum_", "term", "id_", "integer",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'if'", "'else'", "'while'", "'do'", "';'", "'{'", "'}'", "'('", 
		"')'", "'='", "'<'", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"STRING", "INT", "WS",
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
			this.state = 21;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 20;
				this.statement();
				}
				}
				this.state = 23;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << tinycParser.T__0) | (1 << tinycParser.T__2) | (1 << tinycParser.T__3) | (1 << tinycParser.T__4) | (1 << tinycParser.T__5) | (1 << tinycParser.T__7) | (1 << tinycParser.T__12) | (1 << tinycParser.STRING) | (1 << tinycParser.INT))) !== 0));
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
			this.state = 60;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 25;
				this.match(tinycParser.T__0);
				this.state = 26;
				this.paren_expr();
				this.state = 27;
				this.statement();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 29;
				this.match(tinycParser.T__0);
				this.state = 30;
				this.paren_expr();
				this.state = 31;
				this.statement();
				this.state = 32;
				this.match(tinycParser.T__1);
				this.state = 33;
				this.statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 35;
				this.match(tinycParser.T__2);
				this.state = 36;
				this.paren_expr();
				this.state = 37;
				this.statement();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 39;
				this.match(tinycParser.T__3);
				this.state = 40;
				this.statement();
				this.state = 41;
				this.match(tinycParser.T__2);
				this.state = 42;
				this.paren_expr();
				this.state = 43;
				this.match(tinycParser.T__4);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 45;
				this.match(tinycParser.T__5);
				this.state = 49;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << tinycParser.T__0) | (1 << tinycParser.T__2) | (1 << tinycParser.T__3) | (1 << tinycParser.T__4) | (1 << tinycParser.T__5) | (1 << tinycParser.T__7) | (1 << tinycParser.T__12) | (1 << tinycParser.STRING) | (1 << tinycParser.INT))) !== 0)) {
					{
					{
					this.state = 46;
					this.statement();
					}
					}
					this.state = 51;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 52;
				this.match(tinycParser.T__6);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 53;
				this.expr();
				this.state = 54;
				this.match(tinycParser.T__4);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 56;
				this.function_call();
				this.state = 57;
				this.match(tinycParser.T__4);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 59;
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
	public function_call(): Function_callContext {
		let _localctx: Function_callContext = new Function_callContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, tinycParser.RULE_function_call);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 62;
			this.match(tinycParser.STRING);
			this.state = 63;
			this.match(tinycParser.T__7);
			this.state = 64;
			this.expr();
			this.state = 65;
			this.match(tinycParser.T__8);
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
		this.enterRule(_localctx, 6, tinycParser.RULE_paren_expr);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this.match(tinycParser.T__7);
			this.state = 68;
			this.expr();
			this.state = 69;
			this.match(tinycParser.T__8);
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
		this.enterRule(_localctx, 8, tinycParser.RULE_expr);
		try {
			this.state = 76;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 71;
				this.test();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 72;
				this.id_();
				this.state = 73;
				this.match(tinycParser.T__9);
				this.state = 74;
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
		this.enterRule(_localctx, 10, tinycParser.RULE_test);
		try {
			this.state = 83;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 78;
				this.sum_(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 79;
				this.sum_(0);
				this.state = 80;
				this.match(tinycParser.T__10);
				this.state = 81;
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
		let _startState: number = 12;
		this.enterRecursionRule(_localctx, 12, tinycParser.RULE_sum_, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			{
			this.state = 86;
			this.term();
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 96;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 94;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
					case 1:
						{
						_localctx = new Sum_Context(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, tinycParser.RULE_sum_);
						this.state = 88;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 89;
						this.match(tinycParser.T__11);
						this.state = 90;
						this.term();
						}
						break;

					case 2:
						{
						_localctx = new Sum_Context(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, tinycParser.RULE_sum_);
						this.state = 91;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 92;
						this.match(tinycParser.T__12);
						this.state = 93;
						this.term();
						}
						break;
					}
					}
				}
				this.state = 98;
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
		this.enterRule(_localctx, 14, tinycParser.RULE_term);
		try {
			this.state = 102;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case tinycParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 99;
				this.id_();
				}
				break;
			case tinycParser.T__12:
			case tinycParser.INT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 100;
				this.integer();
				}
				break;
			case tinycParser.T__7:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 101;
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
		this.enterRule(_localctx, 16, tinycParser.RULE_id_);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 104;
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
		this.enterRule(_localctx, 18, tinycParser.RULE_integer);
		try {
			this.state = 109;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case tinycParser.INT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 106;
				this.match(tinycParser.INT);
				}
				break;
			case tinycParser.T__12:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 107;
				this.match(tinycParser.T__12);
				this.state = 108;
				this.match(tinycParser.INT);
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
		case 6:
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x12r\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x06\x02\x18\n\x02" +
		"\r\x02\x0E\x02\x19\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x032\n\x03\f" +
		"\x03\x0E\x035\v\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x05\x03?\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05" +
		"\x06O\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05\x07V\n\x07\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x07\ba\n\b\f\b\x0E" +
		"\bd\v\b\x03\t\x03\t\x03\t\x05\ti\n\t\x03\n\x03\n\x03\v\x03\v\x03\v\x05" +
		"\vp\n\v\x03\v\x02\x02\x03\x0E\f\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f" +
		"\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x02\x02\x02w\x02\x17\x03\x02\x02" +
		"\x02\x04>\x03\x02\x02\x02\x06@\x03\x02\x02\x02\bE\x03\x02\x02\x02\nN\x03" +
		"\x02\x02\x02\fU\x03\x02\x02\x02\x0EW\x03\x02\x02\x02\x10h\x03\x02\x02" +
		"\x02\x12j\x03\x02\x02\x02\x14o\x03\x02\x02\x02\x16\x18\x05\x04\x03\x02" +
		"\x17\x16\x03\x02\x02\x02\x18\x19\x03\x02\x02\x02\x19\x17\x03\x02\x02\x02" +
		"\x19\x1A\x03\x02\x02\x02\x1A\x03\x03\x02\x02\x02\x1B\x1C\x07\x03\x02\x02" +
		"\x1C\x1D\x05\b\x05\x02\x1D\x1E\x05\x04\x03\x02\x1E?\x03\x02\x02\x02\x1F" +
		" \x07\x03\x02\x02 !\x05\b\x05\x02!\"\x05\x04\x03\x02\"#\x07\x04\x02\x02" +
		"#$\x05\x04\x03\x02$?\x03\x02\x02\x02%&\x07\x05\x02\x02&\'\x05\b\x05\x02" +
		"\'(\x05\x04\x03\x02(?\x03\x02\x02\x02)*\x07\x06\x02\x02*+\x05\x04\x03" +
		"\x02+,\x07\x05\x02\x02,-\x05\b\x05\x02-.\x07\x07\x02\x02.?\x03\x02\x02" +
		"\x02/3\x07\b\x02\x0202\x05\x04\x03\x0210\x03\x02\x02\x0225\x03\x02\x02" +
		"\x0231\x03\x02\x02\x0234\x03\x02\x02\x0246\x03\x02\x02\x0253\x03\x02\x02" +
		"\x026?\x07\t\x02\x0278\x05\n\x06\x0289\x07\x07\x02\x029?\x03\x02\x02\x02" +
		":;\x05\x06\x04\x02;<\x07\x07\x02\x02<?\x03\x02\x02\x02=?\x07\x07\x02\x02" +
		">\x1B\x03\x02\x02\x02>\x1F\x03\x02\x02\x02>%\x03\x02\x02\x02>)\x03\x02" +
		"\x02\x02>/\x03\x02\x02\x02>7\x03\x02\x02\x02>:\x03\x02\x02\x02>=\x03\x02" +
		"\x02\x02?\x05\x03\x02\x02\x02@A\x07\x10\x02\x02AB\x07\n\x02\x02BC\x05" +
		"\n\x06\x02CD\x07\v\x02\x02D\x07\x03\x02\x02\x02EF\x07\n\x02\x02FG\x05" +
		"\n\x06\x02GH\x07\v\x02\x02H\t\x03\x02\x02\x02IO\x05\f\x07\x02JK\x05\x12" +
		"\n\x02KL\x07\f\x02\x02LM\x05\n\x06\x02MO\x03\x02\x02\x02NI\x03\x02\x02" +
		"\x02NJ\x03\x02\x02\x02O\v\x03\x02\x02\x02PV\x05\x0E\b\x02QR\x05\x0E\b" +
		"\x02RS\x07\r\x02\x02ST\x05\x0E\b\x02TV\x03\x02\x02\x02UP\x03\x02\x02\x02" +
		"UQ\x03\x02\x02\x02V\r\x03\x02\x02\x02WX\b\b\x01\x02XY\x05\x10\t\x02Yb" +
		"\x03\x02\x02\x02Z[\f\x04\x02\x02[\\\x07\x0E\x02\x02\\a\x05\x10\t\x02]" +
		"^\f\x03\x02\x02^_\x07\x0F\x02\x02_a\x05\x10\t\x02`Z\x03\x02\x02\x02`]" +
		"\x03\x02\x02\x02ad\x03\x02\x02\x02b`\x03\x02\x02\x02bc\x03\x02\x02\x02" +
		"c\x0F\x03\x02\x02\x02db\x03\x02\x02\x02ei\x05\x12\n\x02fi\x05\x14\v\x02" +
		"gi\x05\b\x05\x02he\x03\x02\x02\x02hf\x03\x02\x02\x02hg\x03\x02\x02\x02" +
		"i\x11\x03\x02\x02\x02jk\x07\x10\x02\x02k\x13\x03\x02\x02\x02lp\x07\x11" +
		"\x02\x02mn\x07\x0F\x02\x02np\x07\x11\x02\x02ol\x03\x02\x02\x02om\x03\x02" +
		"\x02\x02p\x15\x03\x02\x02\x02\v\x193>NU`bho";
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
	public function_call(): Function_callContext | undefined {
		return this.tryGetRuleContext(0, Function_callContext);
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


export class Function_callContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(tinycParser.STRING, 0); }
	public expr(): ExprContext {
		return this.getRuleContext(0, ExprContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return tinycParser.RULE_function_call; }
	// @Override
	public enterRule(listener: tinycListener): void {
		if (listener.enterFunction_call) {
			listener.enterFunction_call(this);
		}
	}
	// @Override
	public exitRule(listener: tinycListener): void {
		if (listener.exitFunction_call) {
			listener.exitFunction_call(this);
		}
	}
	// @Override
	public accept<Result>(visitor: tinycVisitor<Result>): Result {
		if (visitor.visitFunction_call) {
			return visitor.visitFunction_call(this);
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


