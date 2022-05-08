export function computationExpressions() {
  return `
  a = 2;
  b = 5;
  c = 90;
  d = -23;
  e = -777;
  f = 6;
  g = 4;

  printn(a + 100);
  printn(101 + a);
  printn(a + c);
  printn(a + d);

  printn(1 - a);
  printn(a - 100);
  printn(-101 + a);
  printn(a - c);
  printn(a - d);

  printn(b < b);
  printn(b < f);
  printn(b < g);
  printn(b < 5);
  printn(b < 6);
  printn(b < 4);
  printn(5 < b);
  printn(5 < f);
  printn(5 < g);

  printn(b > b);
  printn(b > f);
  printn(b > g);
  printn(b > 5);
  printn(b > 6);
  printn(b > 4);
  printn(5 > b);
  printn(5 > f);
  printn(5 > g);
  `;
}
