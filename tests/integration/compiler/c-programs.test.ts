import { expect } from 'chai';
import { compileAll } from '../../fixtures/compiler';
import { assembleAll } from '../../fixtures/assembler';
import { simulateOutputingConsole } from '../../fixtures/simulator';
import { printStatements } from '../../fixtures/c-programs/print-statements';
import { complexExpressions } from '../../fixtures/c-programs/complex-expressions';
import { computationExpressions } from '../../fixtures/c-programs/computation-expressions';

describe('C programs tests', () => {
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
});
