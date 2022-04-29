import { EventEmitter } from 'events';
import { Port } from '../port';

export class Device extends EventEmitter {
  public name: string;
  protected _waiting: boolean;

  constructor(name: string) {
    super();
    this.name = name;
    this._waiting = false;
  }

  get waiting() { return this._waiting }
  set waiting(value) {
    if (value === this._waiting) return;
    this._waiting = value;
    this.emit('waiting', value);
  }

  reset() {

  }

  getPorts(): Port[] {
    return [];
  }
}