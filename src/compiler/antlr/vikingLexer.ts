// Generated from src/compiler/grammar/viking.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly STRING = 15;
	public static readonly ID = 16;
	public static readonly DIGITS = 17;
	public static readonly WS = 18;

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
		"T__9", "T__10", "T__11", "T__12", "T__13", "STRING", "STRING_CHAR", "ID", 
		"DIGITS", "WS",
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
	public get grammarFileName(): string { return "viking.g4"; }

	// @Override
	public get ruleNames(): string[] { return vikingLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return vikingLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return vikingLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return vikingLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x14\x83\b\x01" +
		"\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
		"\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
		"\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
		"\x12\x04\x13\t\x13\x04\x14\t\x14\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03" +
		"\t\x03\n\x03\n\x03\v\x03\v\x03\f\x03\f\x03\r\x03\r\x03\x0E\x03\x0E\x03" +
		"\x0F\x03\x0F\x03\x10\x03\x10\x06\x10P\n\x10\r\x10\x0E\x10Q\x03\x10\x03" +
		"\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x05\x11a\n\x11\x03\x11\x05\x11d\n\x11\x03\x11\x03" +
		"\x11\x03\x11\x03\x11\x06\x11j\n\x11\r\x11\x0E\x11k\x05\x11n\n\x11\x03" +
		"\x12\x06\x12q\n\x12\r\x12\x0E\x12r\x03\x12\x07\x12v\n\x12\f\x12\x0E\x12" +
		"y\v\x12\x03\x13\x06\x13|\n\x13\r\x13\x0E\x13}\x03\x14\x03\x14\x03\x14" +
		"\x03\x14\x02\x02\x02\x15\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06" +
		"\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17\x02\r\x19" +
		"\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02\x11!\x02\x02#\x02\x12%\x02\x13" +
		"\'\x02\x14\x03\x02\t\x06\x02\f\f\x0F\x0F$$^^\f\x02$$))AA^^cdhhppttvvx" +
		"x\x03\x0229\x05\x022;CHch\x04\x02C\\c|\x03\x022;\x05\x02\v\f\x0F\x0F\"" +
		"\"\x02\x8D\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03" +
		"\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02" +
		"\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02" +
		"\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02" +
		"\x02\x02\x02\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02" +
		"\x02\x02\x02#\x03\x02\x02\x02\x02%\x03\x02\x02\x02\x02\'\x03\x02\x02\x02" +
		"\x03)\x03\x02\x02\x02\x05,\x03\x02\x02\x02\x071\x03\x02\x02\x02\t7\x03" +
		"\x02\x02\x02\v9\x03\x02\x02\x02\r;\x03\x02\x02\x02\x0F=\x03\x02\x02\x02" +
		"\x11?\x03\x02\x02\x02\x13A\x03\x02\x02\x02\x15C\x03\x02\x02\x02\x17E\x03" +
		"\x02\x02\x02\x19G\x03\x02\x02\x02\x1BI\x03\x02\x02\x02\x1DK\x03\x02\x02" +
		"\x02\x1FM\x03\x02\x02\x02!m\x03\x02\x02\x02#p\x03\x02\x02\x02%{\x03\x02" +
		"\x02\x02\'\x7F\x03\x02\x02\x02)*\x07k\x02\x02*+\x07h\x02\x02+\x04\x03" +
		"\x02\x02\x02,-\x07g\x02\x02-.\x07n\x02\x02./\x07u\x02\x02/0\x07g\x02\x02" +
		"0\x06\x03\x02\x02\x0212\x07y\x02\x0223\x07j\x02\x0234\x07k\x02\x0245\x07" +
		"n\x02\x0256\x07g\x02\x026\b\x03\x02\x02\x0278\x07}\x02\x028\n\x03\x02" +
		"\x02\x029:\x07\x7F\x02\x02:\f\x03\x02\x02\x02;<\x07=\x02\x02<\x0E\x03" +
		"\x02\x02\x02=>\x07*\x02\x02>\x10\x03\x02\x02\x02?@\x07+\x02\x02@\x12\x03" +
		"\x02\x02\x02AB\x07?\x02\x02B\x14\x03\x02\x02\x02CD\x07>\x02\x02D\x16\x03" +
		"\x02\x02\x02EF\x07@\x02\x02F\x18\x03\x02\x02\x02GH\x07-\x02\x02H\x1A\x03" +
		"\x02\x02\x02IJ\x07/\x02\x02J\x1C\x03\x02\x02\x02KL\x07.\x02\x02L\x1E\x03" +
		"\x02\x02\x02MO\x07$\x02\x02NP\x05!\x11\x02ON\x03\x02\x02\x02PQ\x03\x02" +
		"\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02\x02RS\x03\x02\x02\x02ST\x07$" +
		"\x02\x02T \x03\x02\x02\x02Un\n\x02\x02\x02VW\x07^\x02\x02Wn\x07\f\x02" +
		"\x02XY\x07^\x02\x02YZ\x07\x0F\x02\x02Zn\x07\f\x02\x02[\\\x07^\x02\x02" +
		"\\n\t\x03\x02\x02]^\x07^\x02\x02^`\t\x04\x02\x02_a\t\x04\x02\x02`_\x03" +
		"\x02\x02\x02`a\x03\x02\x02\x02ac\x03\x02\x02\x02bd\t\x04\x02\x02cb\x03" +
		"\x02\x02\x02cd\x03\x02\x02\x02dn\x03\x02\x02\x02ef\x07^\x02\x02fg\x07" +
		"z\x02\x02gi\x03\x02\x02\x02hj\t\x05\x02\x02ih\x03\x02\x02\x02jk\x03\x02" +
		"\x02\x02ki\x03\x02\x02\x02kl\x03\x02\x02\x02ln\x03\x02\x02\x02mU\x03\x02" +
		"\x02\x02mV\x03\x02\x02\x02mX\x03\x02\x02\x02m[\x03\x02\x02\x02m]\x03\x02" +
		"\x02\x02me\x03\x02\x02\x02n\"\x03\x02\x02\x02oq\t\x06\x02\x02po\x03\x02" +
		"\x02\x02qr\x03\x02\x02\x02rp\x03\x02\x02\x02rs\x03\x02\x02\x02sw\x03\x02" +
		"\x02\x02tv\t\x07\x02\x02ut\x03\x02\x02\x02vy\x03\x02\x02\x02wu\x03\x02" +
		"\x02\x02wx\x03\x02\x02\x02x$\x03\x02\x02\x02yw\x03\x02\x02\x02z|\t\x07" +
		"\x02\x02{z\x03\x02\x02\x02|}\x03\x02\x02\x02}{\x03\x02\x02\x02}~\x03\x02" +
		"\x02\x02~&\x03\x02\x02\x02\x7F\x80\t\b\x02\x02\x80\x81\x03\x02\x02\x02" +
		"\x81\x82\b\x14\x02\x02\x82(\x03\x02\x02\x02\v\x02Q`ckmrw}\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!vikingLexer.__ATN) {
			vikingLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(vikingLexer._serializedATN));
		}

		return vikingLexer.__ATN;
	}

}

