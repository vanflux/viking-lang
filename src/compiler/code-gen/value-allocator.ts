import { Generator } from './generator';

export interface AllocableValue {
  id: number;
  changed: boolean;
  register?: string;
  stackPos?: number;
  literal?: number;
}

export class ValueAllocator {
  private allocables: AllocableValue[] = [];
  private usedStackPoses = new Set<number>();
  private availableRegisters = ['r1', 'r2', 'r3', 'r4'];
  private nextId = 0;

  constructor(private gen: Generator) {}

  /**
   * Find allocable by id
   * @param id 
   * @returns 
   */
  private getAllocable(id: number) {
    const allocable = this.allocables.find(x => x.id === id);
    if (!allocable) throw new Error('Allocable not found');
    return allocable;
  }

  /**
   * Allocate some stack position for the allocable if hasnt an allocated stack position
   * @param id
   */
  private allocStackPos(id: number) {
    let stackPos = 0;
    const allocable = this.getAllocable(id);
    if (allocable.stackPos != undefined) return;
    while (this.usedStackPoses.has(stackPos)) stackPos += 2;
    this.usedStackPoses.add(stackPos);
    allocable.stackPos = stackPos;
  }

  /**
   * Deallocate stack position of the allocable if has an allocated stack position
   * @param id
   */
  private deallocStackPos(id: number) {
    const allocable = this.getAllocable(id);
    if (allocable.stackPos == undefined) return;
    if (allocable.stackPos != undefined) this.usedStackPoses.delete(allocable.stackPos);
    allocable.stackPos = undefined;
  }

  /**
   * Allocate some register for the allocable if hasnt an allocated register AND load from stack or literal if load == true
   * @param id
   */
  private allocRegister(id: number, load = true, blacklist: string[] = []) {
    const allocable = this.getAllocable(id);
    if (allocable.register) return;

    let register: string;
    if (this.availableRegisters.length > 0) {
      register = this.availableRegisters.shift()!;
    } else {
      // TODO: add rule to deallocate the less used
      const usableAllocables = this.allocables.filter(x => x.register && !blacklist.includes(x.register));
      const oldAllocable = usableAllocables.find(x => !x.changed) || usableAllocables[0];
      
      if (!oldAllocable) throw new Error('No allocable for next register, compiler register allocation bug');
      if (!oldAllocable.register) throw new Error('Next register allocable has no register, compiler register allocation bug');
      register = oldAllocable.register;
      this.deallocRegister(oldAllocable.id);
      this.availableRegisters.splice(this.availableRegisters.indexOf(register));
    }

    if (load) {
      if (allocable.literal != undefined) {
        this.gen.genLitToRegMov(allocable.literal, register);
        allocable.changed = true;
      } else if (allocable.stackPos != undefined) {
        this.gen.genStackToRegMov(allocable.stackPos, register);
      }
    }

    allocable.register = register;
    allocable.literal = undefined;
  }

  /**
   * Deallocate register of the allocable if has an allocated register AND save to stack if save == true
   * @param id
   */
  deallocRegister(id: number, save = true) {
    const allocable = this.getAllocable(id);
    if (!allocable.register) return;
    if (allocable.changed && save) {
      this.allocStackPos(id);
      this.gen.genRegToStackMov(allocable.stackPos!, allocable.register);
    }
    this.availableRegisters.unshift(allocable.register);
    allocable.register = undefined;
    allocable.changed = false;
  }

  /**
   * Ensures that the allocable is on a register AND with the most actual value if load == true
   * @param id
   * @param blacklist
   * @param canLoad
   * @returns
   */
  ensureOnRegister(id: number, load = true, blacklist: string[] = []) {
    const allocable = this.getAllocable(id);
    this.allocRegister(id, load, blacklist);
    return allocable.register!;
  }

  /**
   * Set allocable value with a literal
   * @param id 
   * @param literal 
   */
  setLiteral(id: number, literal: number) {
    const allocable = this.getAllocable(id);
    this.deallocRegister(id, false);
    allocable.literal = literal;
    allocable.changed = false;
  }

  /**
   * Set allocable value with another
   * @param srcId 
   * @param dstId 
   * @returns 
   */
  setValue(srcId: number, dstId: number) {
    if (dstId === srcId) return;
    const srcAllocable = this.getAllocable(srcId);
    const dstAllocable = this.getAllocable(dstId);
    if (srcAllocable.literal != undefined) {
      if (dstAllocable.register != undefined) {
        if (dstAllocable.changed) {
          this.gen.genLitToRegMov(srcAllocable.literal, dstAllocable.register);
          dstAllocable.changed = true;
        } else {
          this.deallocRegister(dstId, false);
          dstAllocable.literal = srcAllocable.literal;
          dstAllocable.changed = false;
        }
      } else {
        dstAllocable.literal = srcAllocable.literal;
        dstAllocable.changed = false;
      }
    } else if (srcAllocable.register != undefined) {
      if (dstAllocable.register) {
        this.gen.genRegToRegMov(srcAllocable.register, dstAllocable.register!);
        dstAllocable.changed = true;
      } else {
        this.allocRegister(dstId, false, [srcAllocable.register]);
        this.gen.genRegToRegMov(srcAllocable.register, dstAllocable.register!);
        dstAllocable.changed = true;
      }
    } else if (srcAllocable.stackPos != undefined) {
      if (dstAllocable.register) {
        this.gen.genStackToRegMov(srcAllocable.stackPos, dstAllocable.register!);
        dstAllocable.changed = true;
      } else {
        this.allocRegister(dstId, false);
        this.gen.genStackToRegMov(srcAllocable.stackPos, dstAllocable.register!);
        dstAllocable.changed = true;
      }
    } else {
      throw new Error('Unsupported value allocator setValue');
    }
  }

  /**
   * Inform that the allocable register has changes to be saved if needed
   * @param id 
   */
  informChanged(id: number) {
    const allocable = this.getAllocable(id);
    allocable.changed = true;
  }

  /**
   * Allocate an value
   * @returns 
   */
  allocateId() {
    const allocable: AllocableValue = {
      id: this.nextId++,
      changed: false,
    };
    this.allocables.push(allocable);
    return allocable.id;
  }

  /**
   * Basically, move the ownership of allocations from one to another allocable
   * @param srcId 
   * @param dstId 
   */
  moveValue(srcId: number, dstId: number) {
    const srcAllocable = this.getAllocable(srcId);
    const dstAllocable = this.getAllocable(dstId);
    this.deallocStackPos(dstId);
    this.deallocRegister(dstId, false);
    this.allocables.splice(this.allocables.findIndex(x => x.id === srcId), 1);
    dstAllocable.literal = srcAllocable.literal;
    dstAllocable.register = srcAllocable.register;
    dstAllocable.stackPos = srcAllocable.stackPos;
    dstAllocable.changed = srcAllocable.changed;
    srcAllocable.literal = undefined;
    srcAllocable.register = undefined;
    srcAllocable.stackPos = undefined;
    srcAllocable.changed = false;
  }

  /**
   * Completelly deallocate an allocable
   * @param id 
   */
  deallocId(id: number) {
    this.deallocStackPos(id);
    this.deallocRegister(id, false);
    this.allocables.splice(this.allocables.findIndex(x => x.id === id), 1);
  }

  fork() {
    const allocator = new ValueAllocator(this.gen);
    allocator.allocables = this.allocables.map(x => ({...x}));
    allocator.usedStackPoses = new Set(this.usedStackPoses);
    allocator.availableRegisters = [...this.availableRegisters];
    allocator.nextId = this.nextId;
    return allocator;
  }
}
