export interface CommentParseResult {
  hasComment: boolean;
  comment?: string;
  rest: string;
}

export class CommentParser {
  parse(str: string): CommentParseResult {
    let index = str
      .replace(/".+"/g, '') // Ignore strings content
      .indexOf('//');
    return index >= 0
      ? {
          hasComment: true,
          comment: str.substring(index + 2),
          rest: str.substring(0, index),
        }
      : {
          hasComment: false,
          rest: str,
        };
  }
}
