import { expect } from 'chai';
import { cProgram1 } from '../../fixtures/c-programs/cProgram1';
import { cProgram2 } from '../../fixtures/c-programs/cProgram2';
import { cProgram3 } from '../../fixtures/c-programs/cProgram3';
import { compileAndRun } from '../../fixtures/functions';

describe('Complete program tests', () => {
  [
    { code: cProgram1(), expected: [ 1344 ] },
    { code: cProgram2(), expected: [ 6765 ] },
    { code: cProgram3(), expected: [ 5 ] },
  ].forEach(({ code, expected }, i) => {
    it(`Compile and run program ${i}`, async () => {
      expect(await compileAndRun(code)).to.deep.eq({ numbers: expected, chars: [] });
    });
  });
});
