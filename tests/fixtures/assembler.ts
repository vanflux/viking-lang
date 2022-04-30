import { ArchitectureManager } from "../../src/architectureManager";
import Assembler from "../../src/assembler/assembler";
import { PseudoConverter } from "../../src/pseudoInstructionConversions/pseudoConverter";
import { PC_Asr } from "../../src/pseudoInstructionConversions/pseudos/asr";
import { PC_Bez } from "../../src/pseudoInstructionConversions/pseudos/bez";
import { PC_Bnz } from "../../src/pseudoInstructionConversions/pseudos/bnz";
import { PC_Hcf } from "../../src/pseudoInstructionConversions/pseudos/hcf";
import { PC_Ldb } from "../../src/pseudoInstructionConversions/pseudos/ldb";
import { PC_Ldi } from "../../src/pseudoInstructionConversions/pseudos/ldi";
import { PC_Ldw } from "../../src/pseudoInstructionConversions/pseudos/ldw";
import { PC_Lsl } from "../../src/pseudoInstructionConversions/pseudos/lsl";
import { PC_Lsr } from "../../src/pseudoInstructionConversions/pseudos/lsr";
import { PC_Mov } from "../../src/pseudoInstructionConversions/pseudos/mov";
import { PC_Neg } from "../../src/pseudoInstructionConversions/pseudos/neg";
import { PC_Nop } from "../../src/pseudoInstructionConversions/pseudos/nop";
import { PC_Not } from "../../src/pseudoInstructionConversions/pseudos/not";
import { PC_Pop } from "../../src/pseudoInstructionConversions/pseudos/pop";
import { PC_Push } from "../../src/pseudoInstructionConversions/pseudos/push";
import { PC_Ror } from "../../src/pseudoInstructionConversions/pseudos/ror";
import { PC_Stb } from "../../src/pseudoInstructionConversions/pseudos/stb";
import { PC_Stw } from "../../src/pseudoInstructionConversions/pseudos/stw";
import { PC__Large_Immediate } from "../../src/pseudoInstructionConversions/pseudos/_large_immediate";

export function assembleAll(code: string) {
  const architecture = ArchitectureManager.getViking16Arch();
  const pseudoConverter = new PseudoConverter([
      new PC__Large_Immediate(),
      new PC_Asr(),
      new PC_Bez(),
      new PC_Bnz(),
      new PC_Hcf(),
      new PC_Ldb(),
      new PC_Ldi(),
      new PC_Ldw(),
      new PC_Lsr(),
      new PC_Lsl(),
      new PC_Mov(),
      new PC_Neg(),
      new PC_Nop(),
      new PC_Not(),
      new PC_Pop(),
      new PC_Push(),
      new PC_Ror(),
      new PC_Stb(),
      new PC_Stw(),
  ]);
  const assembler = new Assembler(architecture, code, pseudoConverter);
  return assembler.assemble();
}
