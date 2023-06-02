import { $tryCatch } from '../src'
import { expect } from 'chai'

describe('try-catch.ts', () => {
  describe('#$tryCatch()', () => {
    it('returns a result if no exception is thrown', () => {
      const actual = $tryCatch(
        () => 3,
        () => undefined,
      )

      expect(actual).to.equal(3)
    })

    it('should handle the error if one is thrown', () => {
      const actual = $tryCatch(
        () => {
          throw new Error('Test error')
        },
        (err) => err.message,
      )

      expect(actual).to.equal('Test error')
    })

    it('should return a constant value if specified', () => {
      const actual = $tryCatch(() => {
        throw new Error('Test error')
      }, 'An unexpected error occurred')

      expect(actual).to.equal('An unexpected error occurred')
    })
  })
})
