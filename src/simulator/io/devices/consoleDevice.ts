import { unsignedToSigned } from '../../../common/utils';
import { Simulation } from '../../simulation';
import { Port } from '../port';
import { Device } from './device';

export class ConsoleDevice extends Device {
  private inputBytes: number[];
  private readCharPort: Port;
  private readIntPort: Port;
  private writeCharPort: Port;
  private writeIntPort: Port;
  private ports: Port[];

  constructor() {
    super('console');
    
    this.inputBytes = [];

    this.readCharPort = new Port('readc', this.readChar.bind(this), undefined, this);
    this.readIntPort = new Port('readi', this.readInt.bind(this), undefined, this);
    this.writeCharPort = new Port('writec', undefined, this.writeChar.bind(this), this);
    this.writeIntPort = new Port('writei', undefined, this.writeInt.bind(this), this);

    this.ports = [ this.writeCharPort, this.writeIntPort, this.readCharPort, this.readIntPort ];
  }

  get waiting() { return this._waiting }
  set waiting(value) {
    if (value === this._waiting) return;
    this._waiting = value;
    this.emit('waiting', value);
  }

  readInt(simulation: Simulation) {
    if (this.inputBytes.length === 0) {
      this.readIntPort.waitingRead = true;
      this.waiting = true;
      return;
    }
    let zeroCharCode = '0'.charCodeAt(0);
    let nineCharCode = '9'.charCodeAt(0);
    let minusCharCode = '-'.charCodeAt(0);

    function isMinusChar(c: number) {
      return minusCharCode === c;
    }

    function isNumberChar(c: number) {
      return c >= zeroCharCode && c <= nineCharCode;
    }

    function charToNumber(c: number) {
      return c - zeroCharCode;
    }

    let int = 0;
    let firstC = this.nextByte();
    if (isNumberChar(firstC) || isMinusChar(firstC)) {
      if (isNumberChar(firstC)) {
        int = charToNumber(firstC!);
      }

      let length = this.inputBytes.length;
      for (let i = 0; i < length; i++) {
        let c = this.nextByte();
        if (isNumberChar(c)) {
          let number = charToNumber(c);
          int *= 10;
          int += number;
        } else {
          if (c === 0) {
            this.nextByte();
          }
          break;
        }
      }

      if (isMinusChar(firstC)) {
        int *= -1;
      }
    } else {
      // lê os bytes do inputs até acabar ou até o byteWidth da arquitetura
      // se o input tiver 1 byte e o byteWidth da arquitetura for 2 bytes, 16 bits, vai ler apenas 1 byte
      // se o input tiver 5 bytes e o byteWidth da arquitetura for 2 bytes, vai ler apenas 2 bytes
      int = firstC;
      let length = Math.min(simulation.getArchitecture().getByteWidth() - 1, this.inputBytes.length);
      for (let i = 0; i < length; i++) {
        let c = this.nextByte();
        int = (int << 8) | c;
      }
    }
    
    return int;
  }
  
  readChar(simulation: Simulation) {
    if (this.inputBytes.length === 0) {
      this.readCharPort.waitingRead = true;
      this.waiting = true;
      return;
    }
    return this.nextByte();
  }

  writeInt(simulation: Simulation, value: number) {
    this.emit('write int', unsignedToSigned(value));
    return false;
  }
  
  writeChar(simulation: Simulation, value: number) {
    if (value === 0) return false;
    this.emit('write char', String.fromCharCode(value));
    return false;
  }

  reset() {
    this.inputBytes.length = 0;
    this.emit('input buffer', this.inputBytes);
    this.waiting = false;
  }

  nextByte() {
    let byte = this.inputBytes.shift();
    this.emit('input buffer', this.inputBytes);
    return byte!;
  }
  
  addBytes(bytes: number[]) {
    for (let byte of bytes) this.inputBytes.push(byte & 0xFF);
    this.emit('input buffer', this.inputBytes);
    if (this.readCharPort.waitingRead) {
      this.readCharPort.endReadWaiting();
      this.waiting = false;
    }
    if (this.readIntPort.waitingRead) {
      this.readIntPort.endReadWaiting();
      this.waiting = false;
    }
  }

  getPorts() {
    return this.ports;
  }
}