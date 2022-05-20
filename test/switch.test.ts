import { equal } from 'assert';
import { $switch } from '../src/index';

describe('switch.ts', () => {
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
