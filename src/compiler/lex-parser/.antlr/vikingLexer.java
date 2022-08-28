// Generated from d:\Lucas\Projetos\viking-lang\src\compiler\lex-parser\viking.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class vikingLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.9.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		TYPE=18, STRING=19, ID=20, DIGITS=21, WS=22;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
			"TYPE", "STRING", "STRING_CHAR", "ID", "DIGITS", "WS"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "'if'", "'else'", "'while'", "'return'", "'{'", "'}'", "'='", 
			"'('", "','", "')'", "'<'", "'>'", "'+'", "'-'", "'['", "']'", "'int'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, "TYPE", "STRING", "ID", "DIGITS", 
			"WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public vikingLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "viking.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\30\u009a\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\3\2"+
		"\3\2\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3"+
		"\6\3\6\3\6\3\6\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3"+
		"\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\3\21\3\22\3\22\3\23\3\23\3\23"+
		"\3\23\3\24\3\24\6\24g\n\24\r\24\16\24h\3\24\3\24\3\25\3\25\3\25\3\25\3"+
		"\25\3\25\3\25\3\25\3\25\3\25\3\25\5\25x\n\25\3\25\5\25{\n\25\3\25\3\25"+
		"\3\25\3\25\6\25\u0081\n\25\r\25\16\25\u0082\5\25\u0085\n\25\3\26\6\26"+
		"\u0088\n\26\r\26\16\26\u0089\3\26\7\26\u008d\n\26\f\26\16\26\u0090\13"+
		"\26\3\27\6\27\u0093\n\27\r\27\16\27\u0094\3\30\3\30\3\30\3\30\2\2\31\3"+
		"\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\20\37"+
		"\21!\22#\23%\24\'\25)\2+\26-\27/\30\3\2\t\6\2\f\f\17\17$$^^\f\2$$))AA"+
		"^^cdhhppttvvxx\3\2\629\5\2\62;CHch\4\2C\\c|\3\2\62;\5\2\13\f\17\17\"\""+
		"\2\u00a4\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2"+
		"\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27"+
		"\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\2!\3\2\2"+
		"\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2+\3\2\2\2\2-\3\2\2\2\2/\3\2\2\2"+
		"\3\61\3\2\2\2\5\63\3\2\2\2\7\66\3\2\2\2\t;\3\2\2\2\13A\3\2\2\2\rH\3\2"+
		"\2\2\17J\3\2\2\2\21L\3\2\2\2\23N\3\2\2\2\25P\3\2\2\2\27R\3\2\2\2\31T\3"+
		"\2\2\2\33V\3\2\2\2\35X\3\2\2\2\37Z\3\2\2\2!\\\3\2\2\2#^\3\2\2\2%`\3\2"+
		"\2\2\'d\3\2\2\2)\u0084\3\2\2\2+\u0087\3\2\2\2-\u0092\3\2\2\2/\u0096\3"+
		"\2\2\2\61\62\7=\2\2\62\4\3\2\2\2\63\64\7k\2\2\64\65\7h\2\2\65\6\3\2\2"+
		"\2\66\67\7g\2\2\678\7n\2\289\7u\2\29:\7g\2\2:\b\3\2\2\2;<\7y\2\2<=\7j"+
		"\2\2=>\7k\2\2>?\7n\2\2?@\7g\2\2@\n\3\2\2\2AB\7t\2\2BC\7g\2\2CD\7v\2\2"+
		"DE\7w\2\2EF\7t\2\2FG\7p\2\2G\f\3\2\2\2HI\7}\2\2I\16\3\2\2\2JK\7\177\2"+
		"\2K\20\3\2\2\2LM\7?\2\2M\22\3\2\2\2NO\7*\2\2O\24\3\2\2\2PQ\7.\2\2Q\26"+
		"\3\2\2\2RS\7+\2\2S\30\3\2\2\2TU\7>\2\2U\32\3\2\2\2VW\7@\2\2W\34\3\2\2"+
		"\2XY\7-\2\2Y\36\3\2\2\2Z[\7/\2\2[ \3\2\2\2\\]\7]\2\2]\"\3\2\2\2^_\7_\2"+
		"\2_$\3\2\2\2`a\7k\2\2ab\7p\2\2bc\7v\2\2c&\3\2\2\2df\7$\2\2eg\5)\25\2f"+
		"e\3\2\2\2gh\3\2\2\2hf\3\2\2\2hi\3\2\2\2ij\3\2\2\2jk\7$\2\2k(\3\2\2\2l"+
		"\u0085\n\2\2\2mn\7^\2\2n\u0085\7\f\2\2op\7^\2\2pq\7\17\2\2q\u0085\7\f"+
		"\2\2rs\7^\2\2s\u0085\t\3\2\2tu\7^\2\2uw\t\4\2\2vx\t\4\2\2wv\3\2\2\2wx"+
		"\3\2\2\2xz\3\2\2\2y{\t\4\2\2zy\3\2\2\2z{\3\2\2\2{\u0085\3\2\2\2|}\7^\2"+
		"\2}~\7z\2\2~\u0080\3\2\2\2\177\u0081\t\5\2\2\u0080\177\3\2\2\2\u0081\u0082"+
		"\3\2\2\2\u0082\u0080\3\2\2\2\u0082\u0083\3\2\2\2\u0083\u0085\3\2\2\2\u0084"+
		"l\3\2\2\2\u0084m\3\2\2\2\u0084o\3\2\2\2\u0084r\3\2\2\2\u0084t\3\2\2\2"+
		"\u0084|\3\2\2\2\u0085*\3\2\2\2\u0086\u0088\t\6\2\2\u0087\u0086\3\2\2\2"+
		"\u0088\u0089\3\2\2\2\u0089\u0087\3\2\2\2\u0089\u008a\3\2\2\2\u008a\u008e"+
		"\3\2\2\2\u008b\u008d\t\7\2\2\u008c\u008b\3\2\2\2\u008d\u0090\3\2\2\2\u008e"+
		"\u008c\3\2\2\2\u008e\u008f\3\2\2\2\u008f,\3\2\2\2\u0090\u008e\3\2\2\2"+
		"\u0091\u0093\t\7\2\2\u0092\u0091\3\2\2\2\u0093\u0094\3\2\2\2\u0094\u0092"+
		"\3\2\2\2\u0094\u0095\3\2\2\2\u0095.\3\2\2\2\u0096\u0097\t\b\2\2\u0097"+
		"\u0098\3\2\2\2\u0098\u0099\b\30\2\2\u0099\60\3\2\2\2\13\2hwz\u0082\u0084"+
		"\u0089\u008e\u0094\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}