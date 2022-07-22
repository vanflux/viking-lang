export function nestedIfStatements4() {
  return `
  a = 1;
  b = 2;
  c = 3;
  d = 4;
  if (b > a) {
    e = 77;
    a = 11;
  } else {
    if (d > c) {
      e = 88;
      a = 22;
    } else {
      e = 99;
      a = 33;
    }
  }
  printn(a);
  printn(b);
  printn(c);
  printn(d);
  printn(e);
  `;
}
