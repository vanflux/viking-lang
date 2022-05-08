// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { vikingListener } from './vikingListener';
import { vikingVisitor } from './vikingVisitor';

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
  public static readonly ID = 15;
  public static readonly DIGITS = 16;
  public static readonly WS = 17;
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
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'entry',
    'stat',
    'parenExpr',
    'expr',
    'assignExpr',
    'relExpr',
    'addExpr',
    'negExpr',
    'callExpr',
    'termExpr',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'if'",
    "'else'",
    "'while'",
    "'{'",
    "'}'",
    "';'",
    "'('",
    "')'",
    "'='",
    "'<'",
    "'>'",
    "'+'",
    "'-'",
    "','",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    'ID',
    'DIGITS',
    'WS',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(vikingParser._LITERAL_NAMES, vikingParser._SYMBOLIC_NAMES, []);

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return vikingParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'viking.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return vikingParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return vikingParser._serializedATN;
  }

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
        this.state = 21;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 20;
              this.stat();
            }
          }
          this.state = 23;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << vikingParser.T__0) |
              (1 << vikingParser.T__2) |
              (1 << vikingParser.T__3) |
              (1 << vikingParser.T__5) |
              (1 << vikingParser.T__6) |
              (1 << vikingParser.T__12) |
              (1 << vikingParser.ID) |
              (1 << vikingParser.DIGITS))) !==
            0
        );
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
      this.state = 51;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 2, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 25;
            this.match(vikingParser.T__0);
            this.state = 26;
            this.parenExpr();
            this.state = 27;
            this.stat();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 29;
            this.match(vikingParser.T__0);
            this.state = 30;
            this.parenExpr();
            this.state = 31;
            this.stat();
            this.state = 32;
            this.match(vikingParser.T__1);
            this.state = 33;
            this.stat();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 35;
            this.match(vikingParser.T__2);
            this.state = 36;
            this.parenExpr();
            this.state = 37;
            this.stat();
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 39;
            this.match(vikingParser.T__3);
            this.state = 43;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (
              (_la & ~0x1f) === 0 &&
              ((1 << _la) &
                ((1 << vikingParser.T__0) |
                  (1 << vikingParser.T__2) |
                  (1 << vikingParser.T__3) |
                  (1 << vikingParser.T__5) |
                  (1 << vikingParser.T__6) |
                  (1 << vikingParser.T__12) |
                  (1 << vikingParser.ID) |
                  (1 << vikingParser.DIGITS))) !==
                0
            ) {
              {
                {
                  this.state = 40;
                  this.stat();
                }
              }
              this.state = 45;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 46;
            this.match(vikingParser.T__4);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 47;
            this.expr();
            this.state = 48;
            this.match(vikingParser.T__5);
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 50;
            this.match(vikingParser.T__5);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
        this.state = 53;
        this.match(vikingParser.T__6);
        this.state = 54;
        this.expr();
        this.state = 55;
        this.match(vikingParser.T__7);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public expr(): ExprContext {
    let _localctx: ExprContext = new ExprContext(this._ctx, this.state);
    this.enterRule(_localctx, 6, vikingParser.RULE_expr);
    try {
      this.state = 59;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 3, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 57;
            this.assignExpr();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 58;
            this.parenExpr();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public assignExpr(): AssignExprContext {
    let _localctx: AssignExprContext = new AssignExprContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, vikingParser.RULE_assignExpr);
    try {
      this.state = 65;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 4, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 61;
            this.relExpr(0);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 62;
            this.match(vikingParser.ID);
            this.state = 63;
            this.match(vikingParser.T__8);
            this.state = 64;
            this.expr();
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
          this.state = 68;
          this.addExpr(0);
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 75;
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
                this.state = 70;
                if (!this.precpred(this._ctx, 1)) {
                  throw this.createFailedPredicateException('this.precpred(this._ctx, 1)');
                }
                this.state = 71;
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
                this.state = 72;
                this.addExpr(0);
              }
            }
          }
          this.state = 77;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
          this.state = 79;
          this.negExpr();
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 86;
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
                this.state = 81;
                if (!this.precpred(this._ctx, 1)) {
                  throw this.createFailedPredicateException('this.precpred(this._ctx, 1)');
                }
                this.state = 82;
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
                this.state = 83;
                this.negExpr();
              }
            }
          }
          this.state = 88;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public negExpr(): NegExprContext {
    let _localctx: NegExprContext = new NegExprContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, vikingParser.RULE_negExpr);
    try {
      this.state = 92;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case vikingParser.T__6:
        case vikingParser.ID:
        case vikingParser.DIGITS:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 89;
            this.callExpr();
          }
          break;
        case vikingParser.T__12:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 90;
            this.match(vikingParser.T__12);
            this.state = 91;
            this.callExpr();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
      this.state = 107;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 94;
            this.termExpr();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 95;
            this.match(vikingParser.ID);
            this.state = 96;
            this.match(vikingParser.T__6);
            this.state = 97;
            this.expr();
            this.state = 102;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === vikingParser.T__13) {
              {
                {
                  this.state = 98;
                  this.match(vikingParser.T__13);
                  this.state = 99;
                  this.expr();
                }
              }
              this.state = 104;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 105;
            this.match(vikingParser.T__7);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public termExpr(): TermExprContext {
    let _localctx: TermExprContext = new TermExprContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, vikingParser.RULE_termExpr);
    try {
      this.state = 112;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case vikingParser.ID:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 109;
            this.match(vikingParser.ID);
          }
          break;
        case vikingParser.DIGITS:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 110;
            this.match(vikingParser.DIGITS);
          }
          break;
        case vikingParser.T__6:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 111;
            this.parenExpr();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x13u\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x06\x02\x18\n\x02' +
    '\r\x02\x0E\x02\x19\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03' +
    '\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03' +
    '\x03\x07\x03,\n\x03\f\x03\x0E\x03/\v\x03\x03\x03\x03\x03\x03\x03\x03\x03' +
    '\x03\x03\x05\x036\n\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05' +
    '\x05\x05>\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06D\n\x06\x03\x07' +
    '\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x07\x07L\n\x07\f\x07\x0E\x07' +
    'O\v\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x07\bW\n\b\f\b\x0E\bZ\v\b' +
    '\x03\t\x03\t\x03\t\x05\t_\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07' +
    '\ng\n\n\f\n\x0E\nj\v\n\x03\n\x03\n\x05\nn\n\n\x03\v\x03\v\x03\v\x05\v' +
    's\n\v\x03\v\x02\x02\x04\f\x0E\f\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f' +
    '\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x02\x04\x03\x02\f\r\x03\x02\x0E\x0F' +
    '\x02z\x02\x17\x03\x02\x02\x02\x045\x03\x02\x02\x02\x067\x03\x02\x02\x02' +
    '\b=\x03\x02\x02\x02\nC\x03\x02\x02\x02\fE\x03\x02\x02\x02\x0EP\x03\x02' +
    '\x02\x02\x10^\x03\x02\x02\x02\x12m\x03\x02\x02\x02\x14r\x03\x02\x02\x02' +
    '\x16\x18\x05\x04\x03\x02\x17\x16\x03\x02\x02\x02\x18\x19\x03\x02\x02\x02' +
    '\x19\x17\x03\x02\x02\x02\x19\x1A\x03\x02\x02\x02\x1A\x03\x03\x02\x02\x02' +
    '\x1B\x1C\x07\x03\x02\x02\x1C\x1D\x05\x06\x04\x02\x1D\x1E\x05\x04\x03\x02' +
    '\x1E6\x03\x02\x02\x02\x1F \x07\x03\x02\x02 !\x05\x06\x04\x02!"\x05\x04' +
    '\x03\x02"#\x07\x04\x02\x02#$\x05\x04\x03\x02$6\x03\x02\x02\x02%&\x07' +
    "\x05\x02\x02&'\x05\x06\x04\x02'(\x05\x04\x03\x02(6\x03\x02\x02\x02)" +
    '-\x07\x06\x02\x02*,\x05\x04\x03\x02+*\x03\x02\x02\x02,/\x03\x02\x02\x02' +
    '-+\x03\x02\x02\x02-.\x03\x02\x02\x02.0\x03\x02\x02\x02/-\x03\x02\x02\x02' +
    '06\x07\x07\x02\x0212\x05\b\x05\x0223\x07\b\x02\x0236\x03\x02\x02\x024' +
    '6\x07\b\x02\x025\x1B\x03\x02\x02\x025\x1F\x03\x02\x02\x025%\x03\x02\x02' +
    '\x025)\x03\x02\x02\x0251\x03\x02\x02\x0254\x03\x02\x02\x026\x05\x03\x02' +
    '\x02\x0278\x07\t\x02\x0289\x05\b\x05\x029:\x07\n\x02\x02:\x07\x03\x02' +
    '\x02\x02;>\x05\n\x06\x02<>\x05\x06\x04\x02=;\x03\x02\x02\x02=<\x03\x02' +
    '\x02\x02>\t\x03\x02\x02\x02?D\x05\f\x07\x02@A\x07\x11\x02\x02AB\x07\v' +
    '\x02\x02BD\x05\b\x05\x02C?\x03\x02\x02\x02C@\x03\x02\x02\x02D\v\x03\x02' +
    '\x02\x02EF\b\x07\x01\x02FG\x05\x0E\b\x02GM\x03\x02\x02\x02HI\f\x03\x02' +
    '\x02IJ\t\x02\x02\x02JL\x05\x0E\b\x02KH\x03\x02\x02\x02LO\x03\x02\x02\x02' +
    'MK\x03\x02\x02\x02MN\x03\x02\x02\x02N\r\x03\x02\x02\x02OM\x03\x02\x02' +
    '\x02PQ\b\b\x01\x02QR\x05\x10\t\x02RX\x03\x02\x02\x02ST\f\x03\x02\x02T' +
    'U\t\x03\x02\x02UW\x05\x10\t\x02VS\x03\x02\x02\x02WZ\x03\x02\x02\x02XV' +
    '\x03\x02\x02\x02XY\x03\x02\x02\x02Y\x0F\x03\x02\x02\x02ZX\x03\x02\x02' +
    '\x02[_\x05\x12\n\x02\\]\x07\x0F\x02\x02]_\x05\x12\n\x02^[\x03\x02\x02' +
    '\x02^\\\x03\x02\x02\x02_\x11\x03\x02\x02\x02`n\x05\x14\v\x02ab\x07\x11' +
    '\x02\x02bc\x07\t\x02\x02ch\x05\b\x05\x02de\x07\x10\x02\x02eg\x05\b\x05' +
    '\x02fd\x03\x02\x02\x02gj\x03\x02\x02\x02hf\x03\x02\x02\x02hi\x03\x02\x02' +
    '\x02ik\x03\x02\x02\x02jh\x03\x02\x02\x02kl\x07\n\x02\x02ln\x03\x02\x02' +
    '\x02m`\x03\x02\x02\x02ma\x03\x02\x02\x02n\x13\x03\x02\x02\x02os\x07\x11' +
    '\x02\x02ps\x07\x12\x02\x02qs\x05\x06\x04\x02ro\x03\x02\x02\x02rp\x03\x02' +
    '\x02\x02rq\x03\x02\x02\x02s\x15\x03\x02\x02\x02\r\x19-5=CMX^hmr';
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
  public get ruleIndex(): number {
    return vikingParser.RULE_entry;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_stat;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_parenExpr;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_expr;
  }
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
  public ID(): TerminalNode | undefined {
    return this.tryGetToken(vikingParser.ID, 0);
  }
  public expr(): ExprContext | undefined {
    return this.tryGetRuleContext(0, ExprContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return vikingParser.RULE_assignExpr;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_relExpr;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_addExpr;
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_negExpr;
  }
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
  public ID(): TerminalNode | undefined {
    return this.tryGetToken(vikingParser.ID, 0);
  }
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
  public get ruleIndex(): number {
    return vikingParser.RULE_callExpr;
  }
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
  public ID(): TerminalNode | undefined {
    return this.tryGetToken(vikingParser.ID, 0);
  }
  public DIGITS(): TerminalNode | undefined {
    return this.tryGetToken(vikingParser.DIGITS, 0);
  }
  public parenExpr(): ParenExprContext | undefined {
    return this.tryGetRuleContext(0, ParenExprContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return vikingParser.RULE_termExpr;
  }
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
