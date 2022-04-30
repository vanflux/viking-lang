// Generated from src/compiler/grammar/tinyc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class tinycLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "STRING", "INT", "WS",
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
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(tinycLexer._LITERAL_NAMES, tinycLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return tinycLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(tinycLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "tinyc.g4"; }

	// @Override
	public get ruleNames(): string[] { return tinycLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return tinycLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return tinycLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return tinycLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x12T\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x03\x02\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07" +
		"\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03" +
		"\r\x03\r\x03\x0E\x03\x0E\x03\x0F\x06\x0FH\n\x0F\r\x0F\x0E\x0FI\x03\x10" +
		"\x06\x10M\n\x10\r\x10\x0E\x10N\x03\x11\x03\x11\x03\x11\x03\x11\x02\x02" +
		"\x02\x12\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02" +
		"\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02" +
		"\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x12\x03\x02\x05\x03\x02c|\x03\x022;" +
		"\x05\x02\v\f\x0F\x0F\"\"\x02U\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02" +
		"\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02" +
		"\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02" +
		"\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02" +
		"\x02\x02\x19\x03\x02\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02" +
		"\x02\x02\x1F\x03\x02\x02\x02\x02!\x03\x02\x02\x02\x03#\x03\x02\x02\x02" +
		"\x05&\x03\x02\x02\x02\x07+\x03\x02\x02\x02\t1\x03\x02\x02\x02\v4\x03\x02" +
		"\x02\x02\r6\x03\x02\x02\x02\x0F8\x03\x02\x02\x02\x11:\x03\x02\x02\x02" +
		"\x13<\x03\x02\x02\x02\x15>\x03\x02\x02\x02\x17@\x03\x02\x02\x02\x19B\x03" +
		"\x02\x02\x02\x1BD\x03\x02\x02\x02\x1DG\x03\x02\x02\x02\x1FL\x03\x02\x02" +
		"\x02!P\x03\x02\x02\x02#$\x07k\x02\x02$%\x07h\x02\x02%\x04\x03\x02\x02" +
		"\x02&\'\x07g\x02\x02\'(\x07n\x02\x02()\x07u\x02\x02)*\x07g\x02\x02*\x06" +
		"\x03\x02\x02\x02+,\x07y\x02\x02,-\x07j\x02\x02-.\x07k\x02\x02./\x07n\x02" +
		"\x02/0\x07g\x02\x020\b\x03\x02\x02\x0212\x07f\x02\x0223\x07q\x02\x023" +
		"\n\x03\x02\x02\x0245\x07=\x02\x025\f\x03\x02\x02\x0267\x07}\x02\x027\x0E" +
		"\x03\x02\x02\x0289\x07\x7F\x02\x029\x10\x03\x02\x02\x02:;\x07*\x02\x02" +
		";\x12\x03\x02\x02\x02<=\x07+\x02\x02=\x14\x03\x02\x02\x02>?\x07?\x02\x02" +
		"?\x16\x03\x02\x02\x02@A\x07>\x02\x02A\x18\x03\x02\x02\x02BC\x07-\x02\x02" +
		"C\x1A\x03\x02\x02\x02DE\x07/\x02\x02E\x1C\x03\x02\x02\x02FH\t\x02\x02" +
		"\x02GF\x03\x02\x02\x02HI\x03\x02\x02\x02IG\x03\x02\x02\x02IJ\x03\x02\x02" +
		"\x02J\x1E\x03\x02\x02\x02KM\t\x03\x02\x02LK\x03\x02\x02\x02MN\x03\x02" +
		"\x02\x02NL\x03\x02\x02\x02NO\x03\x02\x02\x02O \x03\x02\x02\x02PQ\t\x04" +
		"\x02\x02QR\x03\x02\x02\x02RS\b\x11\x02\x02S\"\x03\x02\x02\x02\x05\x02" +
		"IN\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!tinycLexer.__ATN) {
			tinycLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(tinycLexer._serializedATN));
		}

		return tinycLexer.__ATN;
	}

}

