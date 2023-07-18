import { expect } from 'chai';
import { cProgram1 } from '../../fixtures/c-programs/cProgram1';
import { cProgram2 } from '../../fixtures/c-programs/cProgram2';
import { cProgram3 } from '../../fixtures/c-programs/cProgram3';
import { cProgram4 } from '../../fixtures/c-programs/cProgram4';
import { cProgram5 } from '../../fixtures/c-programs/cProgram5';
import { cProgram6 } from '../../fixtures/c-programs/cProgram6';
import { cProgram7 } from '../../fixtures/c-programs/cProgram7';
import { compileAndRun } from '../../fixtures/functions';

describe('Complete program tests', () => {
  [
    { code: cProgram1(), expected: [ 1344 ] },
    { code: cProgram2(), expected: [ 6765 ] },
    { code: cProgram3(), expected: [ 5 ] },
    { code: cProgram4(), expected: [ 95 ] },
    { code: cProgram5(), expected: [ 60 ] },
    { code: cProgram6(), expected: [ 60 ] },
    { code: cProgram7(), expected: [ 60 ] },
  ].forEach(({ code, expected }, i) => {
    it(`Compile and run program ${i + 1}`, async () => {
      expect(await compileAndRun(code)).to.deep.eq({ numbers: expected, chars: [] });
    });
  });
});
