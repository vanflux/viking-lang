import { ArchitectureManager } from '../../src/common';
import { Compiler } from '../../src/compiler/compiler';

export function compileAll(code: string) {
  const architecture = ArchitectureManager.getViking16Arch();
  const compiler = new Compiler(architecture);
  return compiler.compile(code);
}
