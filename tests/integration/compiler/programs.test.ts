import { expect } from 'chai';
import { compileAndRun } from '../../fixtures/functions';

describe('Complete program tests', () => {
  [
    { until: 64, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55] },
    { until: 127, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] },
    { until: 128, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89] },
    { until: 255, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233] },
    { until: 256, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233] },
  ].forEach(({ until, expected }) => {
    it(`Compile fibonacci until ${until}`, async () => {
      expect(await compileAndRun(`
        a = 0;
        b = 1;
        printn(a);
        while (b < ${until}) {
          printn(b);
          c = a + b;
          a = b;
          b = c;
        }
      `)).to.deep.eq({ numbers: expected, chars: [] });
    });
  });
});
