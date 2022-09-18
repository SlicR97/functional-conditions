import { equal } from 'assert';
import '../src/globalize';

describe('globalize.ts', () => {
  it('should provide $if as a global function', () => {
    const actual = $if(
      true,
      1,
      2
    );

    equal(actual, 1);
  });

  it('should provide $switch as a global function', () => {
    const actual = $switch({
      with: 'a',
      cases: [
        ['a', 1]
      ],
      default: 2
    });

    equal(actual, 1);
  });

  it('should provide $tryCatch as a global function', () => {
    const actual = $tryCatch(
      () => 1,
      () => 0
    )

    equal(actual, 1)
  })
});
