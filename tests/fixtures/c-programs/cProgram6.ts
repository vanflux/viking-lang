export function cProgram6() {
  return `
  int main() {
    int a = 1;
    int b = 2;
    int c = 3;
    int d = 4;
    int e = 50;
    return test(a, b, c, d, e);
  }

  int test(int a, int b, int c, int d, int e) {
    return a + b + c + d + e;
  }
  `;
}
