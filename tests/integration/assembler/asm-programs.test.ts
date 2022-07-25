import { expect } from 'chai';
import { bubbleSort1 } from '../../fixtures/asm-programs/bubble-sort-1';
import { bubbleSort2 } from '../../fixtures/asm-programs/bubble-sort-2';
import { bubbleSort3 } from '../../fixtures/asm-programs/bubble-sort-3';
import { fibonacci } from '../../fixtures/asm-programs/fibonacci';
import { functionCall } from '../../fixtures/asm-programs/function-call';
import { assemble } from '../../fixtures/functions';

describe('Assembler asm programs tests', () => {
  // All of these expected results are the programs
  // assembled by the official viking assembler

  it('Assemble bubble sort 1', () => {
    const result = assemble(bubbleSort1());
    const expected =
      '9e009e0a98009820d0e09e009e1498009852d0e09e009e1e98009820d0e000038900980098d442029b009bd6440e98f0980250828c2098f09800508259015b0265289800982cd0a08c0a98f098005082d0f8980098d04102980098d443026b01332c980098cec060200052205a01980098d25042980098d04102980098d44302334c980098bac0609c009cd653845364410e5488548842123144980098a6c020410e5032504e980098d242025a01980098d2504298009874d0e0980098d041025901980098d0502298009858d0e0d0f800000000000afffb0008ffea007b004dffff0063ffdf000a000c';
    expect(result.rawObjectCode).to.be.eq(expected);
  });

  it('Assemble bubble sort 2', () => {
    const result = assemble(bubbleSort2());
    const expected =
      '9e009e0a98009820d0e09e009e1498009852d0e09e009e1e98009820d0e000038900980098b642029b009bb8440e98f0980250828c2098f09800508259015b0265289800982cd0a08c0a98f098005082d0f88900980098b643026b01332c980098b4c060200052205a01980098b64302334c980098acc0609d009db853a45364430e54a854884412358c980098a4c0a0200050609d009db853a45364508e54a8548850125a019800986ad0e0590198009854d0e0d0f8000afffb0008ffea007b004dffff0063ffdf000a000c';
    expect(result.rawObjectCode).to.be.eq(expected);
  });

  it('Assemble bubble sort 3', () => {
    const result = assemble(bubbleSort3());
    const expected =
      '9d019d326f0250be98019848450255b46f0250be6f0250de9e009e229d009da6d0f4461e5f0499019932980198484202430698019830440250728b209801982e4402507259026a0198009830d0408b0a50729d019d4a6f0250be98019886450255b46f0250be6f0250de9e009e749d009da6d0f4461e5f049901994a980198864202430698019830440250728b209801982e4402507259026a0198009882d0408b0a507200036f02503e6f02505e6f02507e6f02509e212404fc5c0a44126c0234849801981cd08002245a0204fc5c0a44126c02348898019814d08005fc5d0c43165364430e4416548844126f02507e33709801980ad06005fc5d0e43165364508e44165488431e50725f025a02980098ccd0e05902980098b8d0e0441e5f02431e5f02421e5f02411e5f02d0f8f000f002fffb00030017ffc00022000300410007000afffc000a000b33411a1e302f181ccd1ceee5f08f3eade243ceefe3ece41be7771f67ce28f8071844ff6ef3f123bfc9411e8b19becce9022533dd2349e04ef2f6ec31001e';
    expect(result.rawObjectCode).to.be.eq(expected);
  });

  it('Assemble Fibonacci', () => {
    const result = assemble(fibonacci());
    const expected = '21248a018c159800982a450250369800982845028b20507653280148026c6c0198009806d0800003f000f002';
    expect(result.rawObjectCode).to.be.eq(expected);
  });

  it('Assemble Function call', () => {
    const result = assemble(functionCall());
    const expected =
      '9900995e6f02503e6f0250de9e009e169d009d36d0f4461e5f04990099766f02503e6f0250de9e009e309d009d36d0f4461e5f0400039800985c45026f02503e6f02505e01fc59064106020650565901daf8421e5f02411e5f02d0f8f00074686973206973207468652066697273742063616c6c0a00616e64207468697320697320746865207365636f6e64210a0000';
    expect(result.rawObjectCode).to.be.eq(expected);
  });
});
