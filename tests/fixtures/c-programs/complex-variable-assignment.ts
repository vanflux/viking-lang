export function complexVariableAssignment() {
  return `
  a = 5;
  b = 10;
  c = -30;
  d = 150;
  e = 999;
  f = -1;
  g = c + d;
  f = 1 - (a + b);
  d = f + f + f - 1 + 2 + a + b;
  z = d + (1 - f) + d + c - a + b - g;
  printn(z);
  `;
}
