grammar viking;

entry
   : stat +
   ;

stat
   : 'if' parenExpr stat
   | 'if' parenExpr stat 'else' stat
   | 'while' parenExpr stat
   | '{' stat* '}'
   | expr ';'
   | ';'
   ;

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
   : termExpr
   | ID '(' expr (',' expr)* ')'
   ;

termExpr
   : ID
   | DIGITS
   | parenExpr
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
