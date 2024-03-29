import { CharStreams, CommonTokenStream } from "antlr4ts";
import { Assembler, getAllPseudos, PseudoConverter } from "../../src/assembler";
import { ArchitectureManager } from "../../src/common";
import { Ast, Compiler, DumbCodeGen, Lexer, LinearScan, Parser, SSA } from "../../src/compiler";
import { ConsoleDevice, Memory, RegisterBank, Simulation } from "../../src/simulator";

export interface SimulationResult {
  numbers: number[];
  chars: string[];
}

export function genAst(code: string) {
  const inputStream = CharStreams.fromString(code);
  const lexer = new Lexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Parser(tokenStream);
  const parseTree = parser.entry();
  const astIr = new Ast(parseTree);
  return astIr
}

export function genSSA(astIr: Ast) {
  const ssaIr = new SSA(astIr);
  return ssaIr;
}

export function processRegisterAllocations(ssaIr: SSA) {
  const registerAllocator = new LinearScan();
  registerAllocator.process(ssaIr, {
    registerCount: 4,
  });
  return registerAllocator;
}

export function compile(code: string) {
  const architecture = ArchitectureManager.getViking16Arch();
  const compiler = new Compiler(architecture, new DumbCodeGen());
  return compiler.compile(code);
}

export function assemble(code: string) {
  const architecture = ArchitectureManager.getViking16Arch();
  const pseudoConverter = new PseudoConverter(getAllPseudos());
  const assembler = new Assembler(architecture, pseudoConverter);
  return assembler.assemble(code);
}

export async function simulate(rawObjectCode: string): Promise<SimulationResult> {
  const numbers: number[] = [];
  const chars: string[] = [];
  const architecture = ArchitectureManager.getViking16Arch();
  const memory = Memory.createFromArchitecture(architecture);
  const registerBank = RegisterBank.createFromArchitecture(architecture);
  const simulation = new Simulation(architecture, memory, registerBank);
  const consoleDevice = new ConsoleDevice();
  consoleDevice.on('write int', num => numbers.push(num));
  consoleDevice.on('write char', char => chars.push(char));
  simulation.registerPorts(consoleDevice.getPorts());
  simulation.setStepInterval(0);
  simulation.setRawObjCode(rawObjectCode);

  return new Promise(resolve => {
    simulation.on('run ended', () => resolve({ numbers, chars }));
    simulation.run();
  });
}

export async function compileAndRun(code: string): Promise<SimulationResult> {
  const { code: asmCode } = compile(code);
  const { rawObjectCode } = assemble(asmCode);
  if (!rawObjectCode) return { numbers: [], chars: [] };
  return simulate(rawObjectCode);
}
