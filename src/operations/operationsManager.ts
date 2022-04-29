import { B_Adc } from "./basic/adc";
import { B_Add } from "./basic/add";
import { B_And } from "./basic/and";
import { B_Asr } from "./basic/asr";
import { B_Bez } from "./basic/bez";
import { B_Bnz } from "./basic/bnz";
import { B_Ldb } from "./basic/ldb";
import { B_Ldc } from "./basic/ldc";
import { B_Ldr } from "./basic/ldr";
import { B_Ldw } from "./basic/ldw";
import { B_Lsr } from "./basic/lsr";
import { B_Or } from "./basic/or";
import { B_Ror } from "./basic/ror";
import { B_Sbc } from "./basic/sbc";
import { B_Slt } from "./basic/slt";
import { B_Sltu } from "./basic/sltu";
import { B_Stb } from "./basic/stb";
import { B_Stw } from "./basic/stw";
import { B_Sub } from "./basic/sub";
import { B_Xor } from "./basic/xor";
import { BasicOperation, PseudoOperation } from "./operation";
import { P_Hcf } from "./pseudo/hcf";
import { P_Ldi } from "./pseudo/ldi";
import { P_Lsl } from "./pseudo/lsl";
import { P_Mov } from "./pseudo/mov";
import { P_Neg } from "./pseudo/neg";
import { P_Nop } from "./pseudo/nop";
import { P_Not } from "./pseudo/not";
import { P_Pop } from "./pseudo/pop";
import { P_Push } from "./pseudo/push";

const basicOps: BasicOperation[] = [
    new B_Adc(),
    new B_Add(),
    new B_And(),
    new B_Asr(),
    new B_Bez(),
    new B_Bnz(),
    new B_Ldb(),
    new B_Ldc(),
    new B_Ldr(),
    new B_Ldw(),
    new B_Lsr(),
    new B_Or(),
    new B_Ror(),
    new B_Sbc(),
    new B_Slt(),
    new B_Sltu(),
    new B_Stb(),
    new B_Stw(),
    new B_Sub(),
    new B_Xor(),
];

const pseudoOps: PseudoOperation[] = [
    new P_Hcf(),
    new P_Ldi(),
    new P_Lsl(),
    new P_Mov(),
    new P_Neg(),
    new P_Nop(),
    new P_Not(),
    new P_Pop(),
    new P_Push(),
];

const basicOpsByOpcode = Object.fromEntries(
    basicOps.map(op => [
        op.getOpcode(), // key
        op              // value
    ])
);

const basicOpsByName = Object.fromEntries(
    basicOps.map(op => [
        op.getName(),   // key
        op              // value
    ])
);
const pseudoOpsByName = Object.fromEntries(
    pseudoOps.map(op => [
        op.getName(),   // key
        op              // value
    ])
);

const basicOpsNames = Object.keys(basicOpsByName);
const pseudoOpsNames = Object.keys(pseudoOpsByName);
const opsNames = basicOpsNames.concat(pseudoOpsNames);

export class OperationsManager {
    static getOperationNames() {
        return opsNames;
    }

    static getOperationByName(name: string) {
        return basicOpsByName[name] || pseudoOpsByName[name];
    }

    static getBasicOperationByName(name: string) {
        return basicOpsByName[name];
    }

    static getPseudoOperationByName(name: string) {
        return pseudoOpsByName[name];
    }

    static isOperationName(name: string) {
        return this.getOperationByName(name) != null;
    }

    static isBasicOperationName(name: string) {
        return basicOpsByName[name] != null;
    }

    static isPseudoOperationName(name: string) {
        return pseudoOpsByName[name] != null;
    }

    static getOperationByOpcode(opcode: number) {
        return basicOpsByOpcode[opcode];
    }
}
