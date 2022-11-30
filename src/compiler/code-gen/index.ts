import { Ast } from '../ast-ir';

export * from './dumb-code-gen';
export * from './good-code-gen';

export interface ICodeGen {
  generate(astIr: Ast): string;
}
