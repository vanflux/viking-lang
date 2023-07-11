export function cProgram1() {
  return `
  int main() {
    int a = 1;
    int b = 2;
    int c = 3;
    int d = double(2);
    int e = quad(a) + 1;
    int f = mul(2, 3);
    int sum = (((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (mul(2, 2) + 1 + f))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    )) + ((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    ))) + (((
      (((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + mul(2, 3)))) + (((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + double(c))))
    )) + ((
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (mul(2, 2) + 1 + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))
    ) + (
      (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + double(c))))) +
      ((((a + b) + (c + d) + (e + f)) + ((a + b) + (c + d) + (e + f))) + (((a + b) + (c + d) + (e + mul(2, 3))) + ((a + b) + (c + d) + (e + double(c))))
    )));
    return sum;
  }

  int double(int a) {
    return a + a;
  }

  int quad(int a) {
    int i = 0;
    int b = 0;
    while (i < 4) {
      b = b + a;
      i = i + 1;
    }
    return b;
  }

  int mul(int a, int b) {
    int result = 0;
    while (b > 0) {
      result = result + a;
      b = b - 1;
    }
    return result;
  }
  `;
}
