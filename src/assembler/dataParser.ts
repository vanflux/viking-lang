import { unraw } from 'unraw';
import { Architecture } from '../architecture';
import utils from '../utils';

export class DataParser {
    private architecture: Architecture;

    constructor(architecture: Architecture) {
        this.architecture = architecture;
    }

    parse(str: string) {
        let byteWidth = this.architecture.getByteWidth();
        let bytes = this.parseToBytes(str, byteWidth);
        let data = this.bytesToData(bytes, byteWidth);
        return data;
    }

    parseToBytes(str: string, byteWidth: number) {
        let bytes = [];
        let values = extractValues(str);
        for (let { type, value } of values) {
            switch (type) {
                case 'text':
                    for (let i = 0; i < value.length; i++) {
                        bytes.push(value.charCodeAt(i));
                    }
                    bytes.push(0);
                    break;
                case 'others':
                    let trimmed = value.trim();
                    if (trimmed.length <= 0) break;

                    let splitted = trimmed.split(/(?:[?: \t]+)|,/);
                    if (splitted.some(x => !utils.isInteger(x))) throw new TypeError('Data contains a non-literal');
                    bytes.push(...splitted.reduce((a, b) => a.concat(utils.numberToBytes(parseInt(b), byteWidth)), [] as number[]));
                    break;
                default:
            }
        }
        return bytes;
    }

    bytesToData(bytes: number[], byteWidth: number) {
        let data = [];
        for (let i = 0; i < bytes.length; i += byteWidth) {
            let curBytes = new Array(byteWidth).fill(0);
            for (let j = 0; j < byteWidth; j++) {
                let byte = bytes[i + j];
                curBytes[j] = byte ? byte : 0;
            }
            data.push(utils.bytesToNumber(curBytes));
        }
        return data;
    }
}

function extractValues(str: string) {
    let lastC;
    let startIndex = 0;
    let capturingQuote = false;

    let values = [];
    for (let i = 0; i < str.length; i++) {
        let c = str[i];

        if ((c === '"' && lastC !== '\\')) {
            if (capturingQuote) {
                if (startIndex !== i) values.push({
                    type: 'text',
                    value: unraw(str.substring(startIndex, i)),
                });
                capturingQuote = false;
                startIndex = i + 1;
            } else {
                capturingQuote = true;
                if (startIndex !== i) values.push({
                    type: 'others',
                    value: str.substring(startIndex, i),
                });
                startIndex = i + 1;
            }
        }
        lastC = c;
    }
    if (startIndex !== str.length) values.push({
        type: 'others',
        value: str.substring(startIndex, str.length),
    });
    return values;
}