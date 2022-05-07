import { expect } from 'chai';
import { compileAll } from '../../fixtures/compiler';
import { assembleAll } from '../../fixtures/assembler';
import { simulateOutputingConsole } from '../../fixtures/simulator';
import { printStatements } from '../../fixtures/c-programs/print-statements';
import { complexExpressions } from '../../fixtures/c-programs/complex-expressions';

describe('Assembler asm programs tests', () => {
  // All of these expected results are the programs
  // assembled by the official viking assembler

  it('Compile complex expressions', async () => {
    const code = complexExpressions();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [102, 103, 92, -21, -1, -98, -99, -88, 25, 8, -627, -628, -620], chars: [] });
  });

  it('Compile print statements', async () => {
    const code = printStatements();
    const assembly = compileAll(code);
    const { rawObjectCode } = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [100, 110], chars: ['A', 'U'] });
  });
});
