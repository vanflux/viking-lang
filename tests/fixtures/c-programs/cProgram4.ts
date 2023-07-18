export function cProgram4() {
  return `
  int main() {
    int a0 = 1;
    int b0 = 2;
    int c0 = 3;
    int d0 = 4;
    int e0 = 5;
    int temp = test() + test();
    int r0 = a0 + b0 + c0 + d0 + e0 + temp;
    return r0;
  }

  int test() {
    int a0 = 6;
    int b0 = 7;
    int c0 = 8;
    int d0 = 9;
    int e0 = 10;
    int r0 = a0 + b0 + c0 + d0 + e0;
    return r0;
  }
  `;
}
