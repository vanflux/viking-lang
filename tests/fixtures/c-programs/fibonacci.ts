export function fibonacciProgram(until: number) {
  return `
  a = 0;
  b = 1;
  printn(a);
  while (b < ${until}) {
    printn(b);
    c = a + b;
    a = b;
    b = c;
  }
  `;
}
