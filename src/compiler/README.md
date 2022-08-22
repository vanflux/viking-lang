# Viking Compiler

## Input Code

```c
int test(int a, int b) {
	int c = a + b;
	int d = 0;
	int e = 1;
	while (d < 10) {
		c = c + e;
		if (e < 5) {
			e = e + 1;
		} else {
			e = e + 2;
			c = c + 1;
		}
		d = d + 1;
	}
	int f = ((-(1 - c)) + 55 + 3 - (c + c));
	return 5 - f;
}

int main() {
	int i = 0;
	int z = 0;
	int k = 60;
	while (i < 5) {
		z = z + test(z, k + 5);
		z = z + 1;
		k = k - 1;
		i = i + 1;
	}
	printn(z);
	printn(k);
	return 0;
}
```

## AST

I'm not crazy to put this here, but this step exist, we transform input code on AST IR.

## SSA (Static single-assignment form)

Transform AST IR to SSA IR.

```
TBD
```

## Linear Scan

TBD

### Live ranges

TBD

### Register allocation

TBD

## Stack allocation

TBD

## Code gen

TBD
