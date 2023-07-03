import { expect } from 'chai';
import { genAst, genSSA } from '../../../fixtures/functions';

describe('SSA conversion tests', () => {
  it('Convert function 1 to SSA form', () => {
    const langCode = `
      int test(int a, int b) {
        int c = a + b;
        int d = 0;
        int e = 1;
        while (d < 10) {
          c = c + e;
          if (e < 5) {
            e = e + 1;
          } else {
            e = e + 2;
            c = c + 1;
          }
          d = d + 1;
        }
        int f = ((-(1 - c)) + 55 + 3 - (c + c));
        return 5 - f;
      }
    `;
    const astIr = genAst(langCode);
    const ssaIr = genSSA(astIr);
    const expectedSSA = `test_0(int a0, int b0):
_T0 = a0 + b0
c0 = _T0
d0 = 0
e0 = 1
BR.GO test_1(d0, c0, e0)

test_1(int d0, int c0, int e0):
_T1 = d0 < 10
_T0 = _T1
BR.NZ _T0 test_2(c0, e0, d0) test_6(c0)

test_2(int c0, int e0, int d0):
_T0 = c0 + e0
c1 = _T0
_T2 = e0 < 5
_T1 = _T2
BR.NZ _T1 test_3(e0, c1, d0) test_4(e0, c1, d0)

test_3(int e0, int c0, int d0):
_T0 = e0 + 1
e1 = _T0
BR.GO test_5(d0, c0, e1)

test_4(int e0, int c0, int d0):
_T0 = e0 + 2
e1 = _T0
_T1 = c0 + 1
c1 = _T1
BR.GO test_5(d0, c1, e1)

test_5(int d0, int c0, int e0):
_T0 = d0 + 1
d1 = _T0
BR.GO test_1(d1, c0, e0)

test_6(int c0):
_T0 = 1 - c0
_T1 = - _T0
_T2 = _T1 + 55
_T3 = _T2 + 3
_T4 = c0 + c0
_T5 = _T3 - _T4
f0 = _T5
_T7 = 5 - f0
_T6 = _T7
RET _T6`
    expect(ssaIr.toString()).to.be.eq(expectedSSA);
  });
});
