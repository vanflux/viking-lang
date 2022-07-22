export function nestedWhileStatements1() {
  return `
  x = 0;
  y = 0;
  width = 4;
  height = 4;
  while(y < height) {
    x = 0;
    while(x < width) {
      printn(x);
      printn(y);
      printn(1000);
      x = x + 1;
    }
    y = y + 1;
  }
  `;
}
