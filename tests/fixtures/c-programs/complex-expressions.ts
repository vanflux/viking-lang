export function complexExpressions() {
  return `
  a = 2;
  b = 5;
  c = 90;
  d = -23;
  e = -777;

  printn(a + 100);
  printn(101 + a);
  printn(a + c);
  printn(a + d);

  printn(1 - a);
  printn(a - 100);
  printn(-101 + a);
  printn(a - c);
  printn(a - d);

  x1 = (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x2 = 1 - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x3 = - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  x4 = (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d))) - (((a + 100) + (101 + a)) + ((a + c) - (a + d))) + (((a - 100) + (-101 + a)) + ((a - c) - (a - d)));
  
  printn(x1);
  printn(x2);
  printn(x3);
  printn(x4);
  `;
}
