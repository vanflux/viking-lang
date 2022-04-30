import { ArchitectureManager } from "../../src/architectureManager";
import Assembler from "../../src/assembler/assembler";
import { PseudoConverter } from "../../src/assembler/pseudoConverter";
import { PC_Asr } from "../../src/assembler/pseudos/asr";
import { PC_Bez } from "../../src/assembler/pseudos/bez";
import { PC_Bnz } from "../../src/assembler/pseudos/bnz";
import { PC_Hcf } from "../../src/assembler/pseudos/hcf";
import { PC_Ldb } from "../../src/assembler/pseudos/ldb";
import { PC_Ldi } from "../../src/assembler/pseudos/ldi";
import { PC_Ldw } from "../../src/assembler/pseudos/ldw";
import { PC_Lsl } from "../../src/assembler/pseudos/lsl";
import { PC_Lsr } from "../../src/assembler/pseudos/lsr";
import { PC_Mov } from "../../src/assembler/pseudos/mov";
import { PC_Neg } from "../../src/assembler/pseudos/neg";
import { PC_Nop } from "../../src/assembler/pseudos/nop";
import { PC_Not } from "../../src/assembler/pseudos/not";
import { PC_Pop } from "../../src/assembler/pseudos/pop";
import { PC_Push } from "../../src/assembler/pseudos/push";
import { PC_Ror } from "../../src/assembler/pseudos/ror";
import { PC_Stb } from "../../src/assembler/pseudos/stb";
import { PC_Stw } from "../../src/assembler/pseudos/stw";
import { PC__Large_Immediate } from "../../src/assembler/pseudos/_large_immediate";

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
