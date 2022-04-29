import { Architecture } from "./architecture";

export class ArchitectureManager {
    static getViking16Arch() {
        return new Architecture({
            bitWidth: 16,
            registers: [
                { name: 'r0', code: 0, aliases: [ 'at' ] },
                { name: 'r1', code: 1, aliases: [] },
                { name: 'r2', code: 2, aliases: [] },
                { name: 'r3', code: 3, aliases: [] },
                { name: 'r4', code: 4, aliases: [] },
                { name: 'r5', code: 5, aliases: [ 'sr' ] },
                { name: 'r6', code: 6, aliases: [ 'lr' ] },
                { name: 'r7', code: 7, aliases: [ 'sp' ] },
            ],
            memoryRegions: {
                codeData: 0x0000,
                stack: 0xdffe,
                io: 0xf000,
            },
        });
    }

    static getViking32Arch() {
        return new Architecture({
            bitWidth: 32,
            registers: [
                { name: 'r0', code: 0, aliases: [ 'at' ] },
                { name: 'r1', code: 1, aliases: [] },
                { name: 'r2', code: 2, aliases: [] },
                { name: 'r3', code: 3, aliases: [] },
                { name: 'r4', code: 4, aliases: [] },
                { name: 'r5', code: 5, aliases: [ 'sr' ] },
                { name: 'r6', code: 6, aliases: [ 'lr' ] },
                { name: 'r7', code: 7, aliases: [ 'sp' ] },
            ],
            memoryRegions: {
                codeData: 0x00000000,
                stack: 0x000ffffc,
                io: 0xf0000000,
            },
        });
    }
}
