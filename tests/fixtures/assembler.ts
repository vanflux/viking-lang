import { ArchitectureManager } from '../../src/common/architectureManager';
import { Assembler } from '../../src/assembler/assembler';
import { PseudoConverter } from '../../src/assembler/pseudoConverter';
import { getAllPseudos } from '../../src/assembler/pseudos';

export function assembleAll(code: string) {
  const architecture = ArchitectureManager.getViking16Arch();
  const pseudoConverter = new PseudoConverter(getAllPseudos());
  const assembler = new Assembler(architecture, pseudoConverter);
  return assembler.assemble(code);
}
