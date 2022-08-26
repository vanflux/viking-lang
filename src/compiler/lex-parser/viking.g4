grammar viking;

entry
   : externalStmt +
   ;

// Statements

externalStmt
   : varDeclStmt
   | fnDeclStmt
   ;

stmt
   : ifStmt
   | whileStmt
   | stmtBlock
   | expr ';'
   | ';'
   ;

stmtBlock
   : '{' stmt* '}'
   ;

ifStmt
   : 'if' parenExpr stmt
   | 'if' parenExpr stmt 'else' stmt
   ;

whileStmt
   : 'while' parenExpr stmt
   ;

varDeclStmt
   : TYPE ID '=' expr ';'
   ;

fnDeclStmt
   : TYPE ID '(' (TYPE ID (',' TYPE ID)*)? ')' stmt
   ;

// Expressions

parenExpr
   : '(' expr ')'
   ;

expr
   : assignExpr
   | parenExpr
   ;

assignExpr
   : relExpr
   | ID '=' expr
   ;

relExpr
   : addExpr
   | relExpr ('<'|'>') addExpr
   ;

addExpr
   : negExpr
   | addExpr ('+'|'-') negExpr
   ;

negExpr
   : callExpr
   | '-' callExpr
   ;

callExpr
   : stringExpr
   | ID '(' expr (',' expr)* ')'
   ;

stringExpr
   : STRING
   | arrayExpr
   ;

arrayExpr
   : '[' expr (',' expr)* ']'
   | arrayAccessExpr
   ;

arrayAccessExpr
   : termExpr '[' expr ']'
   | termExpr
   ;

termExpr
   : ID
   | DIGITS
   | parenExpr
   ;

// Tokens

TYPE
   : 'int'
   ;

STRING
   : '"' STRING_CHAR+ '"'
   ;

fragment
STRING_CHAR
   : ~["\\\n\r]
   | '\\\n'
   | '\\\r\n'
   | '\\' ['"?abfnrtv\\]
   | '\\' [0-7] [0-7]? [0-7]?
   | '\\x' [0-9a-fA-F]+
   ;

ID
   : [a-zA-Z] + [0-9] *
   ;

DIGITS
   : [0-9] +
   ;

WS
   : [ \r\n\t] -> skip
   ;
