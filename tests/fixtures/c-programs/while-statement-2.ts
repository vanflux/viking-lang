export function whileStatements2() {
  return `
  a = 0;
  b = 1;
  while(a < 30) {
    a = a + 1;
    if (a > 5+1-3+b) {
      if (a < 9-b) {
        printn(a);
      } else {
        if (a+1 > 13) {
          if (a-2 < 18) {
            printn(a);
          }
        }
      }
    }
  }
  `;
}
