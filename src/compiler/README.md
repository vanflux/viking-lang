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

## SSA + Block arguments

Transform AST IR to SSA + Block arguments IR.

All variables need to have a base name, exemple: "A", given that, "A0", "A1", "A2" are another variables that derived from "A". "A2" is the most updated version of "A". We need this to solve the arguments of each block.

test function step 1 (without arguments)

```c
TEST():
1. C0 = A0 + B0 // int c = a + b;
2. D0 = 0 // int d = 0;
3. E0 = 1 // int e = 1;
4. BR.GO TEST_L0()

TEST_L0():
5. T0 = D0 < 10 // while(d < 10) {
6. BR.NZ T0 TEST_L1() TEST_L5()

TEST_L1():
7. C1 = C0 + E0 // c = c + e;
8. T0 = E0 < 5 // if (e < 5) {
9. BR.NZ T0 TEST_L2() TEST_L3()

TEST_L2():
10. E1 = E0 + 1; // e = e + 1;
11. BR.GO TEST_L4() // }

TEST_L3(): // else {
12. E1 = E0 + 2 // e = e + 2;
13. C1 = C0 + 1 // c = c + 1;
14. BR.GO TEST_L4() // }

TEST_L4():
15. D1 = D0 + 1; // d = d + 1;
16. BR.GO TEST_L1()

TEST_L5():
17. T0 = 1 - C0 // int f = ((-(1 - c)) + 55 + 3 - (c + c));
18. T1 = -T0
19. T2 = T1 + 55
20. T3 = T2 + 3
21. T4 = C0 + C0
22. F0 = T3 - T4
23. T5 = 5 - F0 // return 5 - f;
24. RET T5;
```

test function step 2 (solving arguments)

```c
TEST(A0, B0):
1. C0 = A0 + B0 // int c = a + b;
2. D0 = 0 // int d = 0;
3. E0 = 1 // int e = 1;
4. BR.GO TEST_L0(D0, C0, E0)

TEST_L0(D0, C0, E0):
5. T0 = D0 < 10 // while(d < 10) {
6. BR.NZ T0 TEST_L1(C0, E0, D0) TEST_L5(C0)

TEST_L1(C0, E0, D0):
7. C1 = C0 + E0 // c = c + e;
8. T0 = E0 < 5 // if (e < 5) {
9. BR.NZ T0 TEST_L2(E0, D0, C1) TEST_L3(E0, C1, D0)

TEST_L2(E0, D0, C0):
10. E1 = E0 + 1; // e = e + 1;
11. BR.GO TEST_L4(D0, C0, E1) // }

TEST_L3(E0, C0, D0): // else {
12. E1 = E0 + 2 // e = e + 2;
13. C1 = C0 + 1 // c = c + 1;
14. BR.GO TEST_L4(D0, C1, E1) // }

TEST_L4(D0, C0, E0):
15. D1 = D0 + 1; // d = d + 1;
16. BR.GO TEST_L1(C0, E0, D0)

TEST_L5(C0):
17. T0 = 1 - C0 // int f = ((-(1 - c)) + 55 + 3 - (c + c));
18. T1 = -T0
19. T2 = T1 + 55
20. T3 = T2 + 3
21. T4 = C0 + C0
22. F0 = T3 - T4
23. T5 = 5 - F0 // return 5 - f;
24. RET T5;
```

```
TBD (main method)
```

## Linear Scan

test function

TBD

### Live ranges

TBD

### Register allocation

TBD

## Stack allocation

TBD

## Code gen

TBD
