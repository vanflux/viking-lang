export function cProgram3() {
  return `
  int main() {
    int a = 0;
    while (a < 5) {
      int d = 1;
      a = a + d;
    }
    return a;
  }
  `;
}
