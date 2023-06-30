import { expect } from 'chai';
import { compileAndRun } from '../../fixtures/functions';
/*
describe('While statement tests', () => {
  // The code is big by the same reason of if statement,
  // this tests "converge" method of value allocator

  it('Compile simple while statement', async () => {
    expect(await compileAndRun(`
      a = 0;
      b = 2;
      while(a < 5) {
        printn(a);
        a = a + 1;
        b = b + 2;
      }
      printn(a);
      printn(b);
    `)).to.deep.eq({ numbers: [0, 1, 2, 3, 4, 5, 12], chars: [] });
  });

  it('Compile simple while statement with inner ifs', async () => {
    expect(await compileAndRun(`
      a = 0;
      b = 1;
      while(a < 30) {
        a = a + 1;
        if (a > 5+1-3+b) {
          if (a < 9-b) {
            printn(a);
          } else {
            if (a+1 > 13) {
              if (a-2 < 18) {
                printn(a);
              }
            }
          }
        }
      }
    `)).to.deep.eq({ numbers: [5, 6, 7, 13, 14, 15, 16, 17, 18, 19], chars: [] });
  });

  it('Compile nested while statement', async () => {
    expect(await compileAndRun(`
      x = 0;
      y = 0;
      width = 4;
      height = 4;
      while(y < height) {
        x = 0;
        while(x < width) {
          printn(x);
          printn(y);
          printn(1000);
          x = x + 1;
        }
        y = y + 1;
      }
    `)).to.deep.eq({ numbers: [
      0, 0, 1000, 1, 0, 1000, 2, 0, 1000, 3, 0, 1000, 0, 1, 1000, 1, 1, 1000, 2, 1, 1000, 3, 1, 1000, 0, 2, 1000, 1, 2, 1000, 2, 2, 1000,
      3, 2, 1000, 0, 3, 1000, 1, 3, 1000, 2, 3, 1000, 3, 3, 1000,
    ], chars: [] });
  });
});
*/