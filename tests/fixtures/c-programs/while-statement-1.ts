export function whileStatements1() {
  return `
  a = 0;
  b = 2;
  while(a < 5) {
    printn(a);
    a = a + 1;
    b = b + 2;
  }
  printn(a);
  printn(b);
  `;
}
