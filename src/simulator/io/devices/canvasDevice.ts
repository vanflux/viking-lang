import { Simulation } from "../../simulation";
import { Port } from "../port";
import { Device } from "./device";

export class CanvasDevice extends Device {
  private x = 0;
  private y = 0;
  private p1X = 0;
  private p1Y = 0;
  private p2X = 0;
  private p2Y = 0;

  private setXPort: Port;
  private setYPort: Port;
  private drawPixelPort: Port;
  private clearPixelPort: Port;
  private setP1Port: Port;
  private setP2Port: Port;
  private drawLinePort: Port;
  private clearLinePort: Port;
  private clearPort: Port;

  private ports: Port[];

  constructor() {
    super('canvas');

    this.setXPort = new Port('setX', undefined, this.setX.bind(this), this);
    this.setYPort = new Port('setY', undefined, this.setY.bind(this), this);
    this.drawPixelPort = new Port('drawPixel', undefined, this.drawPixel.bind(this), this);
    this.clearPixelPort = new Port('clearPixel', undefined, this.clearPixel.bind(this), this);
    this.setP1Port = new Port('setP1', undefined, this.setP1.bind(this), this);
    this.setP2Port = new Port('setP2', undefined, this.setP2.bind(this), this);
    this.drawLinePort = new Port('drawLine', undefined, this.drawLine.bind(this), this);
    this.clearLinePort = new Port('clearLine', undefined, this.clearLine.bind(this), this);
    this.clearPort = new Port('clear', undefined, this.clear.bind(this), this);

    this.ports = [
      this.setXPort,
      this.setYPort,
      this.drawPixelPort,
      this.clearPixelPort,
      this.setP1Port,
      this.setP2Port,
      this.drawLinePort,
      this.clearLinePort,
      this.clearPort,
    ];
  }

  setX(simulation: Simulation, value: number) {
    this.x = value;
    return false;
  }
  
  setY(simulation: Simulation, value: number) {
    this.y = value;
    return false;
  }

  drawPixel(simulation: Simulation, value: number) {
    this.emit('draw pixel', this.x, this.y);
    return false;
  }
  
  clearPixel(simulation: Simulation, value: number) {
    this.emit('clear pixel', this.x, this.y);
    return false;
  }

  setP1(simulation: Simulation, value: number) {
    this.p1X = this.x;
    this.p1Y = this.y;
    return false;
  }
  
  setP2(simulation: Simulation, value: number) {
    this.p2X = this.x;
    this.p2Y = this.y;
    return false;
  }

  drawLine(simulation: Simulation, value: number) {
    this.emit('draw line', this.p1X, this.p1Y, this.p2X, this.p2Y);
    return false;
  }
  
  clearLine(simulation: Simulation, value: number) {
    this.emit('clear line', this.p1X, this.p1Y, this.p2X, this.p2Y);
    return false;
  }

  clear(simulation: Simulation, value: number) {
    this.emit('clear');
    return false;
  }
  
  reset() {
    this.emit('reset');
  }

  getPorts() {
    return this.ports;
  }
}