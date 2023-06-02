import { $switch } from '../src'
import { expect } from 'chai'

describe('switch.ts', () => {
  describe('#$switch()', () => {
    it('returns the first case if it fits', () => {
      const actual = $switch({
        with: 'a',
        cases: [
          ['a', () => 1],
          ['b', () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(1)
    })

    it('returns the second case if the first does not fit', () => {
      const actual = $switch({
        with: 'b',
        cases: [
          ['a', () => 1],
          ['b', () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(2)
    })

    it('returns the default value if none of the cases fit', () => {
      const actual = $switch({
        with: 'c',
        cases: [
          ['a', () => 1],
          ['b', () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(3)
    })

    it('is able to accept a boolean function as a case', () => {
      const actual = $switch({
        with: 'abc',
        cases: [
          [(x) => x.length >= 3, () => 1],
          [(x) => x.length < 3, () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(1)
    })

    it('returns the default case if none of the functions return true', () => {
      const actual = $switch({
        with: 'abc',
        cases: [
          [(x) => x.length >= 4, () => 1],
          [(x) => x.length >= 6, () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(3)
    })

    it('always returns the first matching case, even if there are multiple ones', () => {
      const actual = $switch({
        with: 'a',
        cases: [
          ['a', () => 1],
          ['a', () => 2],
        ],
        default: () => 3,
      })

      expect(actual).to.equal(1)
    })

    it("accepts constant values as a case's second parameter", () => {
      const actual = $switch({
        with: 'a',
        cases: [
          ['a', 1],
          ['b', 2],
        ],
        default: 3,
      })

      expect(actual).to.equal(1)
    })
  })
})
