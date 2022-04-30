import { PC_Asr } from "./asr";
import { PC_Bez } from "./bez";
import { PC_Bnz } from "./bnz";
import { PC_Hcf } from "./hcf";
import { PC_Ldb } from "./ldb";
import { PC_Ldi } from "./ldi";
import { PC_Ldw } from "./ldw";
import { PC_Lsl } from "./lsl";
import { PC_Lsr } from "./lsr";
import { PC_Mov } from "./mov";
import { PC_Neg } from "./neg";
import { PC_Nop } from "./nop";
import { PC_Not } from "./not";
import { PC_Pop } from "./pop";
import { PC_Push } from "./push";
import { PC_Ror } from "./ror";
import { PC_Stb } from "./stb";
import { PC_Stw } from "./stw";
import { PC__Large_Immediate } from "./_large_immediate";

export function getAllPseudos() {
  return [
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
  ];
}
