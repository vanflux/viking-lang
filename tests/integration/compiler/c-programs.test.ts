import { expect } from 'chai';
import { compileAll } from '../../fixtures/compiler';
import { assembleAll } from '../../fixtures/assembler';
import { simulateOutputingConsole } from '../../fixtures/simulator';
import { printStatements } from '../../fixtures/c-programs/print-statements';
import { complexExpressions } from '../../fixtures/c-programs/complex-expressions';
import { computationExpressions } from '../../fixtures/c-programs/computation-expressions';
import { ifStatements1 } from '../../fixtures/c-programs/if-statement-1';
import { ifStatements2 } from '../../fixtures/c-programs/if-statement-2';
import { ifStatements3 } from '../../fixtures/c-programs/if-statement-3';
import { ifStatements4 } from '../../fixtures/c-programs/if-statement-4';
import { nestedIfStatements1 } from '../../fixtures/c-programs/nested-if-statement-1';
import { nestedIfStatements2 } from '../../fixtures/c-programs/nested-if-statement-2';
import { nestedIfStatements3 } from '../../fixtures/c-programs/nested-if-statement-3';
import { nestedIfStatements4 } from '../../fixtures/c-programs/nested-if-statement-4';
import { whileStatements1 } from '../../fixtures/c-programs/while-statement-1';
import { whileStatements2 } from '../../fixtures/c-programs/while-statement-2';
import { nestedWhileStatements1 } from '../../fixtures/c-programs/nested-while-statement-1';
import { fibonacciProgram } from '../../fixtures/c-programs/fibonacci';

describe('C programs tests', () => {

  // Expression tests

  it('Compile computation expressions', async () => {
    const code = computationExpressions();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    const expected = [
      ...[102, 103, 92, -21],
      ...[-1, -98, -99, -88, 25],
      ...[0, 1, 0, 0, 1, 0, 0, 1, 0],
      ...[0, 0, 1, 0, 0, 1, 0, 0, 1],
    ]
    expect(output).to.deep.eq({ numbers: expected, chars: [] });
  });

  it('Compile complex expressions', async () => {
    const code = complexExpressions();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    const expected = [8, -627, -628, -620];
    expect(output).to.deep.eq({ numbers: expected, chars: [] });
  });

  it('Compile print statements', async () => {
    const code = printStatements();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [100, 110], chars: ['A', 'U'] });
  });

  // If tests

  it('Compile if statements case 1', async () => {
    const code = ifStatements1();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [1, 6, 3, 4, 7], chars: [] });
  });

  it('Compile if statements case 2', async () => {
    const code = ifStatements2();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [1, 2, 3, 4, 5], chars: [] });
  });

  it('Compile if statements case 3', async () => {
    const code = ifStatements3();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [8, 7, 3, 4, 6], chars: [] });
  });

  it('Compile if statements case 4', async () => {
    const code = ifStatements4();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [1, 2, 3, 4, 5], chars: [] });
  });

  // Nested if tests

  it('Compile nested if statements case 1', async () => {
    const code = nestedIfStatements1();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [33, 2, 3, 4, 99], chars: [] });
  });

  it('Compile nested if statements case 2', async () => {
    const code = nestedIfStatements2();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [11, 2, 3, 4, 77], chars: [] });
  });

  it('Compile nested if statements case 3', async () => {
    const code = nestedIfStatements3();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [22, 2, 3, 4, 88], chars: [] });
  });

  it('Compile nested if statements case 4', async () => {
    const code = nestedIfStatements4();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [11, 2, 3, 4, 77], chars: [] });
  });

  // While tests

  it('Compile while statements case 1', async () => {
    const code = whileStatements1();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [0, 1, 2, 3, 4, 5, 12], chars: [] });
  });

  it('Compile while statements case 2', async () => {
    const code = whileStatements2();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [5, 6, 7, 13, 14, 15, 16, 17, 18, 19], chars: [] });
  });

  // Nested while tests

  it('Compile nested while statements case 1', async () => {
    const code = nestedWhileStatements1();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [0, 0, 1000, 1, 0, 1000, 2, 0, 1000, 3, 0, 1000, 0, 1, 1000, 1, 1, 1000, 2, 1, 1000, 3, 1, 1000, 0, 2, 1000, 1, 2, 1000, 2, 2, 1000, 3, 2, 1000, 0, 3, 1000, 1, 3, 1000, 2, 3, 1000, 3, 3, 1000], chars: [] });
  });

  // Complete programs

  [
    {until: 64, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55]},
    {until: 127, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]},
    {until: 128, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]},
    {until: 255, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]},
    {until: 256, expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]},
  ].forEach(({until, expected}) => {
    it(`Compile fibonacci until ${until}`, async () => {
      const code = fibonacciProgram(until);
      const assembly = compileAll(code);
      const { rawObjectCode } = assembleAll(assembly);
      const output = await simulateOutputingConsole(rawObjectCode!);
      expect(output).to.deep.eq({ numbers: expected, chars: [] });
    });
  });

});
