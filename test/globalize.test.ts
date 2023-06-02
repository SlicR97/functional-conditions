import '../src/globalize'
import { expect } from 'chai'

describe('globalize.ts', () => {
  it('provides $if as a global function', () => {
    const actual = $if(true, 1, 2)

    expect(actual).to.equal(1)
  })

  it('provides $switch as a global function', () => {
    const actual = $switch({
      with: 'a',
      cases: [['a', 1]],
      default: 2,
    })

    expect(actual).to.equal(1)
  })

  it('provides $tryCatch as a global function', () => {
    const actual = $tryCatch(
      () => 1,
      () => 0,
    )

    expect(actual).to.equal(1)
  })
})
