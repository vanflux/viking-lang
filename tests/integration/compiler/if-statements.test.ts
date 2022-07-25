import { expect } from 'chai';
import { compileAndRun } from '../../fixtures/functions';

describe('If statement tests', () => {
  [
    {cmp: 0, numbers: [1, 2, 3, 4, 5]},
    {cmp: 1, numbers: [1, 6, 3, 4, 7]},
  ].forEach(({cmp, numbers}) => {
    // The code is big because it tests if value allocator
    // "converge" method is working properly, it allocates
    // a lot of variables to force stack usage and checks
    // if all variable values are correct at the end.

    it('Compile simple if statement', async () => {
      expect(await compileAndRun(`
        a = 1;
        b = 2;
        c = 3;
        d = 4;
        if (a > ${cmp}) {
          e = 5;
        } else {
          b = 6;
          e = 7;
        }
        printn(a);
        printn(b);
        printn(c);
        printn(d);
        printn(e);
      `)).to.deep.eq({ numbers, chars: [] });
    });
  });

  [
    {expr1: 'a > b', expr2: 'c > d', numbers: [33, 2, 3, 4, 99]},
    {expr1: 'b > a', expr2: 'c > d', numbers: [11, 2, 3, 4, 77]},
    {expr1: 'a > b', expr2: 'd > c', numbers: [22, 2, 3, 4, 88]},
    {expr1: 'b > a', expr2: 'd > c', numbers: [11, 2, 3, 4, 77]},
  ].forEach(({expr1, expr2, numbers}) => {
    it('Compile nested if statement', async () => {
      expect(await compileAndRun(`
        a = 1;
        b = 2;
        c = 3;
        d = 4;
        if (${expr1}) {
          e = 77;
          a = 11;
        } else {
          if (${expr2}) {
            e = 88;
            a = 22;
          } else {
            e = 99;
            a = 33;
          }
        }
        printn(a);
        printn(b);
        printn(c);
        printn(d);
        printn(e);
      `)).to.deep.eq({ numbers, chars: [] });
    });
  });
});
