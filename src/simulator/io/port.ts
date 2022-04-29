import { EventEmitter } from 'events';
import { Simulation } from '../simulation';
import { Device } from './devices/device';

export type PortReadHandler = (simulation: Simulation) => void;
export type PortWriteHandler = (simulation: Simulation, value: number) => boolean;

export class Port extends EventEmitter {
  public name: string;
  public waitingRead = false;
  public waitingWrite = false;
  public device: Device;

  private readHandler: PortReadHandler;
  private writeHandler: PortWriteHandler;

  constructor(name: string, readHandler: PortReadHandler|undefined, writeHandler: PortWriteHandler|undefined, device: Device) {
    super();
    this.name = name;
    this.waitingRead = false;
    this.waitingWrite = false;
    this.readHandler = readHandler ? readHandler : ()=>0;
    this.writeHandler = writeHandler ? writeHandler : ()=>false;
    this.device = device;
  }

  reset() {
    this.waitingRead = false;
    this.waitingWrite = false;
  }

  read(simulation: Simulation) {
    return this.readHandler(simulation);
  }
  
  write(simulation: Simulation, value: number) {
    return this.writeHandler(simulation, value);
  }

  endReadWaiting() {
    this.waitingRead = false;
    this.emit('read wait end');
  }
  
  endWriteWaiting() {
    this.waitingWrite = false;
    this.emit('write wait end');
  }
}