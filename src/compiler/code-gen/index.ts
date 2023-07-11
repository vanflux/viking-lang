import { Ast } from '../ast-ir';

export * from './codegen';

export interface ICodeGen {
  generate(astIr: Ast): string;
}
