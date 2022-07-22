export function ifStatements2() {
  return `
  a = 1;
  b = 2;
  c = 3;
  d = 4;
  if (a > 0) {
    e = 5;
  } else {
    b = 6;
    e = 7;
  }
  printn(a);
  printn(b);
  printn(c);
  printn(d);
  printn(e);
  `;
}
