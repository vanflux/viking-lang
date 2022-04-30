import { expect } from 'chai';
import { simpleVariableAssignment } from '../../fixtures/c-programs/simple-variable-assignment';
import { compileAll } from '../../fixtures/compiler';
import { assembleAll } from '../../fixtures/assembler';
import { complexVariableAssignment } from '../../fixtures/c-programs/complex-variable-assignment';
import { simulateOutputingConsole } from '../../fixtures/simulator';
import { printStatements } from '../../fixtures/c-programs/print-statements';

describe('Assembler asm programs tests', () => {
  // All of these expected results are the programs
  // assembled by the official viking assembler

  it('Compile simple variable assignment', async () => {
    const code = simpleVariableAssignment();
    const assembly = compileAll(code);
    const {rawObjectCode} = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [5], chars: [] });
  });
  
  it('Compile complex variable assignment', async () => {
    const code = complexVariableAssignment();
    const assembly = compileAll(code);
    const {rawObjectCode} = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [-182], chars: [] });
  });
  
  it('Compile print statements', async () => {
    const code = printStatements();
    const assembly = compileAll(code);
    const {rawObjectCode} = assembleAll(assembly);
    const output = await simulateOutputingConsole(rawObjectCode!);
    expect(output).to.deep.eq({ numbers: [100, 110], chars: ['A', 'U'] });
  });
});
