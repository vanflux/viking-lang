export function ifStatements3() {
  return `
  a = 1;
  b = 2;
  c = 3;
  d = 4;
  if (a > 1) {
    e = 5;
  } else {
    e = 6;
    b = 7;
    a = 8;
  }
  printn(a);
  printn(b);
  printn(c);
  printn(d);
  printn(e);
  `;
}
