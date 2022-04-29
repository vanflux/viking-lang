import { MemoryStorage } from "./memory";

export class MemoryStorage16 implements MemoryStorage {
    private data: number[];

    constructor() {
        this.data = new Array(0xFFFF + 1).fill(0);
    }

    reset() {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = 0;
        }
    }

    readByte(address: number) {
        return this.data[address];
    }

    readWord(address: number) {
        let byte0 = this.data[address];
        let byte1 = this.data[address+1];
        return (byte0 << 8) | byte1;
    }

    writeByte(address: number, byte: number) {
        this.data[address] = byte & 0xFF;
    }

    writeWord(address: number, word: number) {
        let byte0 = (word >> 8) & 0xFF;
        let byte1 = word & 0xFF;
        this.data[address] = byte0;
        this.data[address+1] = byte1;
    }

    getDataLength() {
        return this.data.length;
    }

    getData() {
        return this.data;
    }

    getBytesFromRange(start: number, end: number) {
        return this.data.slice(start, end);
    }
    
    getWordsFromRange(start: number, end: number) {
        let byte0 = 0;
        let words = [];
        for (let i = start; i < end; i++) {
            if (i % 2 === 0) {
                byte0 = this.data[i];
            } else {
                let byte1 = this.data[i];
                let word = (byte0 << 8) | byte1;
                words.push(word);
            }
        }
        return words;
    }
}