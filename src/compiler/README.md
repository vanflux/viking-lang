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

```c
test_0(int a?, int b?):                                   // Params: a0 = r1, b0 = r2
_T0 = a0 + b0                                             // r1 = r1 + r2
c0 = _T0                                                  // r1 = r1
d0 = 0                                                    // r2 = 0
e0 = 1                                                    // r3 = 1
BR.GO test_1(d0, c0, e0)                                  // jmp test_1

test_1(int d?, int c?, int e?):                           // Params: d0 = r2, c0 = r1, e0 = r3
_T1 = d0 < 10                                             // r4 = r2 < 10
_T0 = _T1                                                 // r4 = r4
BR.NZ _T0 test_2(c0, e0, d0) test_6(c0)                   // jnz r4 test_2
                                                          // jmp test_6

test_2(int c?, int e?, int d?):                           // Params: c0 = r1, e0 = r3, d0 = r2
_T0 = c0 + e0                                             // r1 = r1 + r3
c1 = _T0                                                  // r1 = r1
_T2 = e0 < 5                                              // r4 = r3 < 5
_T1 = _T2                                                 // r4 = r4
BR.NZ _T1 test_3(e0, c1, d0) test_4(e0, c1, d0)           // jnz r4 test_3
                                                          // jmp test_4

test_3(int e?, int c?, int d?):                           // Params: e0 = r3, c0 = r1, d0 = r2
_T0 = e0 + 1                                              // r3 = r3 + 1
e1 = _T0                                                  // r3 = r3
BR.GO test_5(d0, c0, e1)                                  // jmp test_5

test_4(int e?, int c?, int d?):                           // Params: e0 = r3, c0 = r1, d0 = r2
_T0 = e0 + 2                                              // r3 = r3 + 2
e1 = _T0                                                  // r3 = r3
_T1 = c0 + 1                                              // r1 = r1 + 1
c1 = _T1                                                  // r1 = r1
                                                          // [SPILL] (perfect)
BR.GO test_5(d0, c1, e1)                                  // jmp test_5

test_5(int d?, int c?, int e?):                           // Params: d0 = r2, c0 = r1, e0 = r3
_T0 = d0 + 1                                              // r2 = r2 + 1
d1 = _T0                                                  // r2 = r2
                                                          // [SPILL] (perfect)
BR.GO test_1(d1, c0, e0)                                  // jmp test_1

test_6(int c?):                                           // Params: c0 = r1
_T0 = 1 - c0                                              // r2 = 1 - r1
_T1 = - _T0                                               // r2 = - r2
_T2 = _T1 + 55                                            // r2 = r2 + 55
_T3 = _T2 + 3                                             // r2 = r2 + 3
_T4 = c0 + c0                                             // r1 = r1 + r1
_T5 = _T3 - _T4                                           // r1 = r2 - r1
f0 = _T5                                                  // r1 = r1
_T7 = 5 - f0                                              // r1 = 5 - r1
_T6 = _T7                                                 // r1 = r1
RET _T6                                                   // ret r1
```

## Stack allocation

TBD

## Code gen

```c
test_0
	add r1, r1, r2
	mov r1, r1
	ldi r2, 0
	ldi r3, 1
	bnz r7, test_1

test_1
	ldi r5, 10
	slt r4, r2, r5
	mov r4, r4
	bnz r4, test_2
	bnz r7, test_6

test_2
	add r1, r1, r3
	mov r1, r1
	ldi r5, 5
	slt r4, r3, r5
	mov r4, r4
	bnz r4, test_3
	bnz r7, test_4

test_3
	add r3, 1
	mov r3, r3
	bnz r7, test_5

test_4
	add r3, 2
	mov r3, r3
	add r1, 1
	mov r1, r1
	bnz r7, test_5

test_5
	add r2, 1
	mov r2, r2
	bnz r7, test_1

test_6
	ldi r5, 1
	sub r2, r5, r1
	neg r2
	add r2, 55
	add r2, 3
	add r1, r1, r1
	sub r1, r2, r1
	mov r1, r1
	ldi r5, 5
	sub r1, r5, r1
	mov r1, r1

stw r1, console_writei
hcf

```

TBD
