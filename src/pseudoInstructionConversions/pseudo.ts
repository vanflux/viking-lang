import { Architecture } from "../architecture";
import { Instruction } from "../instruction";
import { Operation } from "../operations/operation";

export interface Pseudo {
  convert(instruction: Instruction, architecture: Architecture): Instruction[];
}
