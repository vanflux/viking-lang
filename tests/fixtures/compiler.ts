import { Compiler } from '../../src/compiler/compiler';

export function compileAll(code: string) {
  const compiler = new Compiler();
  return compiler.compile(code);
}
