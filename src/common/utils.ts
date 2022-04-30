
function signedNumberToHex(number: number, byteWidth=4) {
  return signedToUnsigned(number, byteWidth).toString(16).padStart(byteWidth * 2, '0');
}

function signedToUnsigned(number: number, byteWidth=2) {
  let mask = Math.pow(2, byteWidth * 8) - 1;
  return (((number >>> 0) & mask) >>> 0);
}

function unsignedToSigned(number: number, byteWidth=2) {
let mask = Math.pow(2, byteWidth * 8) - 1;
let isNegative = (number >> (byteWidth * 8 - 1)) & 1;
if (isNegative) {
  return -(((~number+1) & mask) >>> 0);
} else {
  return number & mask;
}
}

function numberToBytes(number: number, byteWidth=2) {
  let bytes = [];
  for (let i = 0; i < byteWidth; i++) {
      bytes.unshift(number & 0xff);
      number >>= 8;
  }
  return bytes;
}

function bytesToNumber(bytes: number[]) {
  let number = 0;
  for (let byte of bytes) {
      number <<= 8;
      number |= byte;
  }
  return number;
}

function isInteger(str: string) {
  return !isNaN(parseInt(str));
}

function sleep(ms: number) {
  if (ms <= 0) return 0;
  return new Promise(resolve => setTimeout(resolve, ms));
}

const utils = {
  signedNumberToHex,
  signedToUnsigned,
  unsignedToSigned,
  numberToBytes,
  bytesToNumber,
  isInteger,
  sleep,
};

export default utils;