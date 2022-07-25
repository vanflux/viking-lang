import { expect } from 'chai';
import { compileAndRun } from '../../fixtures/functions';
import { limitTestNumbers1 } from '../../fixtures/numbers';

describe('Expression tests', () => {
  describe('Computation', () => {
    limitTestNumbers1().forEach(x => {

      it(`Compile negation expressions for ${x}`, async () => {
        expect(
          await compileAndRun(`
            x = ${x};
            printn(-(${x}));
            printn(-(x));
          `)
        ).to.deep.eq({
          numbers: new Array(2).fill(x === 0 ? 0 : -x),
          chars: [],
        });
      });

      limitTestNumbers1().forEach(y => {
        it(`Compile addition expressions between ${x} and ${y}`, async () => {
          expect(
            await compileAndRun(`
              x = ${x};
              y = ${y};
              printn(${x} + ${y});
              printn(${x} + y);
              printn(x + ${y});
              printn(x + y);
            `)
          ).to.deep.eq({
            numbers: new Array(4).fill(x + y),
            chars: [],
          });
        });

        it(`Compile subtraction expressions between ${x} and ${y}`, async () => {
          expect(
            await compileAndRun(`
              x = ${x};
              y = ${y};
              printn(${x} - ${y});
              printn(${x} - y);
              printn(x - ${y});
              printn(x - y);
            `)
          ).to.deep.eq({
            numbers: new Array(4).fill(x - y),
            chars: [],
          });
        });

        it(`Compile less than expressions between ${x} and ${y}`, async () => {
          expect(
            await compileAndRun(`
              x = ${x};
              y = ${y};
              printn(${x} < ${y});
              printn(${x} < y);
              printn(x < ${y});
              printn(x < y);
            `)
          ).to.deep.eq({
            numbers: new Array(4).fill(x < y ? 1 : 0),
            chars: [],
          });
        });

        it(`Compile greater than expressions between ${x} and ${y}`, async () => {
          expect(
            await compileAndRun(`
              x = ${x};
              y = ${y};
              printn(${x} > ${y});
              printn(${x} > y);
              printn(x > ${y});
              printn(x > y);
            `)
          ).to.deep.eq({
            numbers: new Array(4).fill(x > y ? 1 : 0),
            chars: [],
          });
        });
      });
    });
  });

  describe('Pointer access', () => {
    const arr = [100, 101, 102];
    [0, 1, 2].forEach(index => {
      it(`Compile access global array value at index ${index}`, async () => {
        expect(
          await compileAndRun(`
            arr = [${arr}];
            printn(arr[${index}]);
          `)
        ).to.deep.eq({
          numbers: [arr[index]],
          chars: [],
        });
      });
    });
  });

  describe('Function call', () => {
    it('Compile printn call', async () => {
      expect(await compileAndRun(`
        printn(100);
        printn(100+10);
      `)).to.deep.eq({ numbers: [100, 110], chars: [] });
    });

    it('Compile printn call', async () => {
      expect(await compileAndRun(`
        printc(65);
        printc(80+5);
      `)).to.deep.eq({ numbers: [], chars: ['A', 'U'] });
    });
  });

});
