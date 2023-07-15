export function cProgram2() {
  return `
  int main() {
    return fib(20);
  }

  int fib(int n) {
    if (n < 1) {
      return 0;
    }
    if (n < 2) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  }
  `;
}
