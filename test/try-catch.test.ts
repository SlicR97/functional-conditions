import { equal } from 'assert';
import { $tryCatch } from '../src';

describe('try-catch.ts', () => {
  describe('#$tryCatch()', () => {
    it('should return a result if no exception is thrown', () => {
      const actual = $tryCatch(
        () => 3,
        () => undefined
      );

      equal(actual, 3);
    });

    it('should handle the error if one is thrown', () => {
      const actual = $tryCatch(
        () => {
          throw new Error('Test error');
        },
        err => err.message
      );

      equal(actual, 'Test error');
    });

    it('should return a constant value if specified', () => {
      const actual = $tryCatch(
        () => {
          throw new Error('Test error');
        },
        'An unexpected error occurred'
      );

      equal(actual, 'An unexpected error occurred');
    })
  });
});
