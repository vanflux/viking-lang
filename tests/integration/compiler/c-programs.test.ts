import { expect } from 'chai';
import { simulateOutputingConsoleNumbers } from '../../fixtures/simulator';
import { simpleVariableAssignment } from '../../fixtures/c-programs/simple-variable-assignment';
import { compileAll } from '../../fixtures/compiler';
import { assembleAll } from '../../fixtures/assembler';
import { complexVariableAssignment } from '../../fixtures/c-programs/complex-variable-assignment';

describe('Assembler asm programs tests', () => {
  // All of these expected results are the programs
  // assembled by the official viking assembler

  it('Compile simple variable assignment', async () => {
    const code = simpleVariableAssignment();
    const assembly = compileAll(code);
    const {rawObjectCode} = assembleAll(assembly);
    const numbersOutput = await simulateOutputingConsoleNumbers(rawObjectCode!);
    expect(numbersOutput).to.deep.eq([5]);
  });
  
  it('Compile complex variable assignment', async () => {
    const code = complexVariableAssignment();
    const assembly = compileAll(code);
    const {rawObjectCode} = assembleAll(assembly);
    const numbersOutput = await simulateOutputingConsoleNumbers(rawObjectCode!);
    expect(numbersOutput).to.deep.eq([-182]);
  });
});
