import { EventEmitter } from 'events';
import utils from '../utils';
import { Architecture, ArchitectureMemoryRegions } from '../architecture';
import Memory from './memory';
import { RegisterBank } from './registerBank';
import { IOManager } from './io/ioManager';
import { Port } from './io/port';
import { Instruction } from '../instruction';

const endSimulationCode = 0x0003;

export type BreakpointHandler = (simulation: Simulation, pc: number) => boolean;

export class Simulation extends EventEmitter {
	public waitingIO = false;
	
	private architecture: Architecture;
	private memory: Memory;
	private registerBank: RegisterBank;
	
	private codeExecutionMaxPC = 0;
	private running = false;
	private ended = false;
	private stopping = false;
	private stepInterval = 50;
	private cycles = 0;
	private pc = 0;
	private ioManager = new IOManager(this);
	private carry = 0;
	private memoryRegions: ArchitectureMemoryRegions;
	private rawObjCode?: string;

	private breakpointHandler: BreakpointHandler = () => false;

	constructor(architecture: Architecture, memory: Memory, registerBank: RegisterBank) {
		super();
		this.architecture = architecture;
		this.memory = memory;
		this.registerBank = registerBank;
		this.memoryRegions = this.architecture.getMemoryRegions();
		this.setupMemoryHandlers();
	}

	private writeObjCodeMemory() {
		if (!this.rawObjCode) return;
		const wordArray = this.rawObjCode
			.match(/.{1,4}/g)
			?.map(x => parseInt(x, 16)) || [];
		for (let i = 0; i < wordArray.length; i++) {
			const word = wordArray[i];
			this.memory.writeWord(i * 2, word);
		}

		this.codeExecutionMaxPC = wordArray.length * 2;
	}

	reset() {
		if (this.running && !this.stopping) this.stop();
		this.ended = false;
		this.waitingIO = false;
		this.carry = 0;
		this.setPC(0);
		this.setCycles(0);
		this.registerBank.reset();
		this.registerBank.setValue('sp', this.memoryRegions.stack);
		this.memory.reset();
		this.ioManager.reset();
		this.writeObjCodeMemory();
		this.emit('reset');
	}

	setupMemoryHandlers() {
		let ioAddress = this.memoryRegions.io;

		this.memory.onReadWord = (address) => {
			if (address < ioAddress) return;
			let portIndex = (address - ioAddress) / this.architecture.getByteWidth();
			return this.ioManager.read(portIndex);
		};

		this.memory.onWriteWord = (address, value) => {
			if (address < ioAddress) return true;
			let portIndex = (address - ioAddress) / this.architecture.getByteWidth();
			return this.ioManager.write(portIndex, value);
		};
	}

	registerPorts(ports: Port[]) {
		ports.forEach(port => this.ioManager.addPort(port));
	}
	
	unregisterPorts(ports: Port[]) {
		ports.forEach(port => this.ioManager.removePort(port));
	}

	getPortsSymbolTable() {
		let symbolTable: {[port: string]: number} = {};
		let ports = this.ioManager.getPorts();
		let value = this.memoryRegions.io;
		for (let port of ports) {
			if (port.device === null) continue;
			symbolTable[port.device.name + '_' + port.name] = value;
			value += this.architecture.getByteWidth();
		}
		return symbolTable;
	}

	getPortsSymbolsList() {
		let symbolList = [];
		let ports = this.ioManager.getPorts();
		for (let port of ports) {
			if (port.device === null) continue;
			symbolList.push(port.device.name + '_' + port.name);
		}
		return symbolList;
	}

	setRawObjCode(rawObjCode: string) {
		if (rawObjCode.length > this.memoryRegions.io * 2) throw new Error('Object code too big for the memory');
		this.rawObjCode = rawObjCode;
		this.reset();
	}

	step() {
		if (this.pc >= this.codeExecutionMaxPC) throw new Error('PC run out of program bounds');

		let code;

		try {
			code = this.memory.readWord(this.pc);
		} catch (exc) {
			console.error(exc);
			this.emit('run error', exc);
			return this.stop();
		}

		if (code === endSimulationCode) {
			this.ended = true;
			this.emit('run ended');
			return this.stop();
		}

		try {
			let instruction = Instruction.disassemble(code, this.architecture);
			instruction.execute(this);
		} catch (exc) {
			console.error(exc);
			this.emit('run error', exc);
			return this.stop();
		}

		if (this.waitingIO) {
			return this.stop();
		}

		this.incrementPC(2);
		this.incrementCycles(1);

		if (this.breakpointHandler(this, this.pc)) {
			this.emit('breakpoint', this.pc);
			this.stop();
		}
	}

	async runner() {
		this.emit('run started');
		try {
			let timePerBlock = 50;
			let toExecFloat = 0;
			runLoop:
			while (!this.stopping) {
				if (this.stepInterval > 0) {
					toExecFloat += timePerBlock / this.stepInterval;
					if (toExecFloat >= 1) {
						let toExec = Math.floor(toExecFloat);
						toExecFloat -= toExec;
						let start = Date.now();
						for (let i = 0; i < toExec; i++) {
							if (this.stopping) break runLoop;
							this.step();
						}
						let sleepTime = timePerBlock - (Date.now() - start);
						if (sleepTime > 0) await utils.sleep(sleepTime);
					} else {
						await utils.sleep(timePerBlock);
					}
				} else {
					this.step();
				}
			}
		} catch (error) {
			console.error(error);
			this.emit('run error', error);
		}
		this.running = false;
		this.stopping = false;
	}

	stop() {
		if (!this.running) throw new Error('Simulation already stopped');
		if (this.stopping) throw new Error('Simulation already stopping');
		this.stopping = true;
	}

	run() {
		if (this.running) throw new Error('Simulation already running');
		if (this.stopping) throw new Error('Simulation stopping');
		this.running = true;
		this.stopping = false;
		setTimeout(this.runner.bind(this));
	}

	isWaitingIO() {
		return this.waitingIO;
	}

	isRunning() {
		return this.running;
	}

	isStopping() {
		return this.stopping;
	}

	hasEnded() {
		return this.ended;
	}

	getRegisterBank() {
		return this.registerBank;
	}

	getMemory() {
		return this.memory;
	}

	getCarry() {
		return this.carry;
	}

	setCarry(carry: number) {
		this.carry = carry;
	}

	setPC(pc: number) {
		this.pc = (pc >>> 0) & this.architecture.getMask();
		this.emit('pc update', this.pc);
	}

	incrementPC(value: number) {
		this.setPC(this.getPC() + value);
	}

	getPC() {
		return this.pc;
	}

	setCycles(cycles: number) {
		this.cycles = cycles;
		this.emit('cycles update', this.cycles);
	}

	incrementCycles(value: number) {
		this.cycles += value;
		this.emit('cycles update', this.cycles);
	}

	getCycles() {
		return this.cycles;
	}

	getArchitecture() {
		return this.architecture;
	}

	setBreakpointHandler(handler: BreakpointHandler) {
		if (!handler) return this.breakpointHandler = () => false;
		if (typeof handler != 'function') throw new Error('handler isnt function');
		this.breakpointHandler = handler;
	}

	setStepInterval(ms: number) {
		this.stepInterval = ms;
	}

	getStepInterval() {
		return this.stepInterval;
	}
}