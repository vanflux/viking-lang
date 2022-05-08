// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { CharStream } from 'antlr4ts/CharStream';
import { Lexer } from 'antlr4ts/Lexer';
import { LexerATNSimulator } from 'antlr4ts/atn/LexerATNSimulator';
import { NotNull } from 'antlr4ts/Decorators';
import { Override } from 'antlr4ts/Decorators';
import { RuleContext } from 'antlr4ts/RuleContext';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

export class vikingLexer extends Lexer {
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

  // tslint:disable:no-trailing-whitespace
  public static readonly channelNames: string[] = ['DEFAULT_TOKEN_CHANNEL', 'HIDDEN'];

  // tslint:disable:no-trailing-whitespace
  public static readonly modeNames: string[] = ['DEFAULT_MODE'];

  public static readonly ruleNames: string[] = [
    'T__0',
    'T__1',
    'T__2',
    'T__3',
    'T__4',
    'T__5',
    'T__6',
    'T__7',
    'T__8',
    'T__9',
    'T__10',
    'T__11',
    'T__12',
    'T__13',
    'ID',
    'DIGITS',
    'WS',
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
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(vikingLexer._LITERAL_NAMES, vikingLexer._SYMBOLIC_NAMES, []);

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return vikingLexer.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  constructor(input: CharStream) {
    super(input);
    this._interp = new LexerATNSimulator(vikingLexer._ATN, this);
  }

  // @Override
  public get grammarFileName(): string {
    return 'viking.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return vikingLexer.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return vikingLexer._serializedATN;
  }

  // @Override
  public get channelNames(): string[] {
    return vikingLexer.channelNames;
  }

  // @Override
  public get modeNames(): string[] {
    return vikingLexer.modeNames;
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x13]\b\x01\x04' +
    '\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04' +
    '\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r' +
    '\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12' +
    '\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04' +
    '\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06' +
    '\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f' +
    '\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x10\x06\x10K\n' +
    '\x10\r\x10\x0E\x10L\x03\x10\x07\x10P\n\x10\f\x10\x0E\x10S\v\x10\x03\x11' +
    '\x06\x11V\n\x11\r\x11\x0E\x11W\x03\x12\x03\x12\x03\x12\x03\x12\x02\x02' +
    '\x02\x13\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02' +
    '\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02' +
    '\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12#\x02\x13\x03\x02\x05\x04\x02C\\' +
    'c|\x03\x022;\x05\x02\v\f\x0F\x0F""\x02_\x02\x03\x03\x02\x02\x02\x02' +
    '\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02' +
    '\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11' +
    '\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17' +
    '\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D' +
    '\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x02#\x03' +
    '\x02\x02\x02\x03%\x03\x02\x02\x02\x05(\x03\x02\x02\x02\x07-\x03\x02\x02' +
    '\x02\t3\x03\x02\x02\x02\v5\x03\x02\x02\x02\r7\x03\x02\x02\x02\x0F9\x03' +
    '\x02\x02\x02\x11;\x03\x02\x02\x02\x13=\x03\x02\x02\x02\x15?\x03\x02\x02' +
    '\x02\x17A\x03\x02\x02\x02\x19C\x03\x02\x02\x02\x1BE\x03\x02\x02\x02\x1D' +
    'G\x03\x02\x02\x02\x1FJ\x03\x02\x02\x02!U\x03\x02\x02\x02#Y\x03\x02\x02' +
    "\x02%&\x07k\x02\x02&'\x07h\x02\x02'\x04\x03\x02\x02\x02()\x07g\x02\x02" +
    ')*\x07n\x02\x02*+\x07u\x02\x02+,\x07g\x02\x02,\x06\x03\x02\x02\x02-.\x07' +
    'y\x02\x02./\x07j\x02\x02/0\x07k\x02\x0201\x07n\x02\x0212\x07g\x02\x02' +
    '2\b\x03\x02\x02\x0234\x07}\x02\x024\n\x03\x02\x02\x0256\x07\x7F\x02\x02' +
    '6\f\x03\x02\x02\x0278\x07=\x02\x028\x0E\x03\x02\x02\x029:\x07*\x02\x02' +
    ':\x10\x03\x02\x02\x02;<\x07+\x02\x02<\x12\x03\x02\x02\x02=>\x07?\x02\x02' +
    '>\x14\x03\x02\x02\x02?@\x07>\x02\x02@\x16\x03\x02\x02\x02AB\x07@\x02\x02' +
    'B\x18\x03\x02\x02\x02CD\x07-\x02\x02D\x1A\x03\x02\x02\x02EF\x07/\x02\x02' +
    'F\x1C\x03\x02\x02\x02GH\x07.\x02\x02H\x1E\x03\x02\x02\x02IK\t\x02\x02' +
    '\x02JI\x03\x02\x02\x02KL\x03\x02\x02\x02LJ\x03\x02\x02\x02LM\x03\x02\x02' +
    '\x02MQ\x03\x02\x02\x02NP\t\x03\x02\x02ON\x03\x02\x02\x02PS\x03\x02\x02' +
    '\x02QO\x03\x02\x02\x02QR\x03\x02\x02\x02R \x03\x02\x02\x02SQ\x03\x02\x02' +
    '\x02TV\t\x03\x02\x02UT\x03\x02\x02\x02VW\x03\x02\x02\x02WU\x03\x02\x02' +
    '\x02WX\x03\x02\x02\x02X"\x03\x02\x02\x02YZ\t\x04\x02\x02Z[\x03\x02\x02' +
    '\x02[\\\b\x12\x02\x02\\$\x03\x02\x02\x02\x06\x02LQW\x03\b\x02\x02';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!vikingLexer.__ATN) {
      vikingLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(vikingLexer._serializedATN));
    }

    return vikingLexer.__ATN;
  }
}
