import { EventEmitter } from 'events';
import { Architecture, ArchitectureMemoryRegions } from '../common';
import { MemoryStorage16 } from './memoryStorage16';

export interface MemoryStorage {
  reset(): void;
  readByte(address: number): number;
  readWord(address: number): number;
  writeByte(address: number, byte: number): void;
  writeWord(address: number, word: number): void;
  getDataLength(): number;
  getData(): number[];
  getBytesFromRange(start: number, end: number): number[];
  getWordsFromRange(start: number, end: number): number[];
}

export class Memory extends EventEmitter {
  static createFromArchitecture(architecture: Architecture) {
    let bitWidth = architecture.getBitWidth();
    let memoryRegions = architecture.getMemoryRegions();
    let storage: MemoryStorage;
    switch (bitWidth) {
      case 16:
        storage = new MemoryStorage16();
        break;
      /*case 32:
                storage = new MemoryStorage16();
                break;*/
      default:
        throw new Error('Memory for this architecture doesnt exists (implementation doesnt exists)');
    }
    return new Memory(storage, memoryRegions);
  }

  private storage: MemoryStorage;
  private memoryRegions: ArchitectureMemoryRegions;
  public onReadByte?: (address: number) => void;
  public onReadWord?: (address: number) => void;
  public onWriteWord?: (address: number, word: number) => boolean;
  public onWriteByte?: (address: number, byte: number) => boolean;

  constructor(storage: MemoryStorage, memoryRegions: ArchitectureMemoryRegions) {
    super();
    this.storage = storage;
    this.memoryRegions = memoryRegions;
  }

  getMemoryRegions() {
    return this.memoryRegions;
  }

  reset() {
    let result = this.storage.reset();
    this.emit('reset');
    return result;
  }

  getDataLength() {
    return this.storage.getDataLength();
  }

  getBytesFromRange(start: number, end: number) {
    return this.storage.getBytesFromRange(start, end);
  }

  getWordsFromRange(start: number, end: number) {
    return this.storage.getWordsFromRange(start, end);
  }

  readByte(address: number) {
    if (this.onReadByte) {
      let newValue = this.onReadByte(address);
      if (newValue != null) {
        return newValue;
      }
    }
    let result = this.storage.readByte(address);
    this.emit('storage read byte', address);
    return result;
  }

  readWord(address: number) {
    if (this.onReadWord) {
      let newValue = this.onReadWord(address);
      if (newValue != null) {
        return newValue;
      }
    }
    let result = this.storage.readWord(address);
    this.emit('storage read word', address);
    return result;
  }

  writeByte(address: number, byte: number) {
    if (this.onWriteByte) {
      if (!this.onWriteByte(address, byte)) {
        return false;
      }
    }
    let result = this.storage.writeByte(address, byte);
    this.emit('storage write byte', address, byte);
    return result;
  }

  writeWord(address: number, word: number) {
    if (this.onWriteWord) {
      if (!this.onWriteWord(address, word)) {
        return false;
      }
    }
    let result = this.storage.writeWord(address, word);
    this.emit('storage write word', address, word);
    return result;
  }
}
