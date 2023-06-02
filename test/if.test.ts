import { $if } from '../src'
import { expect } from 'chai'

describe('if.ts', () => {
  describe('#$if()', () => {
    it('executes the first path if the condition is true', () => {
      const actual = $if(
        true,
        () => 'x',
        () => 'y',
      )

      expect(actual).to.equal('x')
    })

    it('executes the second path if the condition is false', () => {
      const actual = $if(
        false,
        () => 'x',
        () => 'y',
      )

      expect(actual).to.equal('y')
    })

    it('is able to return any data type', () => {
      const actual = $if(
        true,
        () => 5,
        () => 6,
      )

      expect(actual).to.equal(5)
    })

    it('returns a strongly typed value', () => {
      const actual = $if(
        false,
        () => 'x',
        () => 6,
      )

      expect(actual).to.equal(6)
    })

    it('accepts any value that can be truthy or falsy as its condition', () => {
      const actual = $if(
        'a',
        () => 'x',
        () => 'y',
      )

      expect(actual).to.equal('x')
    })

    it('returns false when given a falsy value', () => {
      const actual = $if(
        '',
        () => 'x',
        () => 'y',
      )

      expect(actual).to.equal('y')
    })

    it('accepts constant values as its then and else cases', () => {
      const actual = $if(true, 1, 2)

      expect(actual).to.equal(1)
    })
  })
})
