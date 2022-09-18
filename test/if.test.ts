import { equal } from 'assert';
import { $if } from '../src';

describe('if.ts', () => {
  describe('#$if()', () => {
    it('should execute the first path if the condition is true', () => {
      const actual = $if (
        true,
        () => 'x',
        () => 'y'
      );

      equal(actual, 'x');
    });

    it('should execute the second path if the condition is false', () => {
      const actual = $if (
        false,
        () => 'x',
        () => 'y'
      );

      equal(actual, 'y');
    });

    it('should be able to return any data type', () => {
      const actual = $if (
        true,
        () => 5,
        () => 6
      );

      equal(actual, 5);
    });

    it('should return a strongly typed value', () => {
      const actual = $if (
        false,
        () => 'x',
        () => 6
      );

      equal(actual, 6);
    });

    it('should accept any value that can be truthy or falsy as its condition', () => {
      const actual = $if (
        'a',
        () => 'x',
        () => 'y'
      );

      equal(actual, 'x');
    });

    it('should return false when given a falsy value', () => {
      const actual = $if (
        '',
        () => 'x',
        () => 'y'
      );

      equal(actual, 'y');
    });

    it('should accept constant values as its then and else cases', () => {
      const actual = $if (
        true,
        1,
        2
      );

      equal(actual, 1);
    });
  });
});
