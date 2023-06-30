import { expect } from 'chai';
import { compileAndRun } from '../../fixtures/functions';
/*
describe('Stack allocation tests', () => {
  it(`Compile stack allocation case 1"`, async () => {
    // Put variables on stack (by allocating a lot)
    // Request the saved values
    expect(
      await compileAndRun(`
        a = 1;
        b = 2;
        c = 3;
        d = 4;
        e = 5;
        f = 6;
        g = 7;
        h = 8;
        printn(a);
        printn(b);
        printn(c);
        printn(d);
        printn(e);
        printn(f);
        printn(g);
        printn(h);
      `)
    ).to.deep.eq({
      numbers: [1, 2, 3, 4, 5, 6, 7, 8],
      chars: [],
    });
  });

  it(`Compile stack allocation case 2"`, async () => {
    // Put variables on stack (by allocating a lot)
    // Change the value of one variable that is saved on stack
    // Request the saved values to this changed variable be saved again on stack
    // Request value of the changed variable
    expect(
      await compileAndRun(`
        h = -8;
        a = 1;
        b = 2;
        c = 3;
        d = 4;
        e = 5;
        f = 6;
        g = 7;
        h = 8;
        printn(a);
        printn(b);
        printn(c);
        printn(d);
        printn(e);
        printn(f);
        printn(g);
        printn(h);
      `)
    ).to.deep.eq({
      numbers: [1, 2, 3, 4, 5, 6, 7, 8],
      chars: [],
    });
  });
  
  it('Compile stack allocation case 3', async () => {
    // Allocate temporary values for large expressions
    expect(
      await compileAndRun(`
        a = 10;
        b = 45;
        c = -50;
        d = 400;
        result = ((a > b) + (b < a) - ((a + b) + (c - (-d)))) + ((a > b) + (b < a) - ((a + b) + (c - (-d))));
        printn(result);
      `)
    ).to.deep.eq({
      numbers: [-810],
      chars: [],
    });
  });

});
*/