import { expect } from 'chai';
import { cProgram1 } from '../../fixtures/c-programs/cProgram1';
import { compileAndRun } from '../../fixtures/functions';

describe('Complete program tests', () => {
  [
    { code: cProgram1(), expected: [ 1344 ] },
  ].forEach(({ code, expected }, i) => {
    it(`Compile program ${i}`, async () => {
      expect(await compileAndRun(code)).to.deep.eq({ numbers: expected, chars: [] });
    });
  });
});
