import { equal } from 'assert';
import { $if, $switch } from '../src/index';

describe('index.ts', () => {
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

  describe('#$switch()', () => {
    it('should return the first case if it fits', () => {
      const actual = $switch ({
        with: 'a',
        cases: [
          ['a', () => 1],
          ['b', () => 2]
        ],
        default: () => 3
      });

      equal(actual, 1);
    });

    it('should return the second case if the first does not fit', () => {
      const actual = $switch({
        with: 'b',
        cases: [
          ['a', () => 1],
          ['b', () => 2]
        ],
        default: () => 3
      });

      equal(actual, 2);
    });

    it('should return the default value if none of the cases fit', () => {
      const actual = $switch({
        with: 'c',
        cases: [
          ['a', () => 1],
          ['b', () => 2]
        ],
        default: () => 3
      });

      equal(actual, 3);
    });

    it('should be able to accept a boolean function as a case', () => {
      const actual = $switch({
        with: 'abc',
        cases: [
          [x => x.length >= 3, () => 1],
          [x => x.length < 3, () => 2]
        ],
        default: () => 3
      });

      equal(actual, 1);
    });

    it('should return the default case if none of the functions return true', () => {
      const actual = $switch({
        with: 'abc',
        cases: [
          [x => x.length >= 4, () => 1],
          [x => x.length >= 6, () => 2]
        ],
        default: () => 3
      });

      equal(actual, 3);
    });

    it('should always return the first matching case, even if there are multiple ones', () => {
      const actual = $switch({
        with: 'a',
        cases: [
          ['a', () => 1],
          ['a', () => 2]
        ],
        default: () => 3
      });

      equal(actual, 1);
    });

    it('should accept constant values as a case\'s second parameter', () => {
      const actual = $switch({
        with: 'a',
        cases: [
          ['a', 1],
          ['b', 2]
        ],
        default: 3
      });

      equal(actual, 1);
    });
  });
});
