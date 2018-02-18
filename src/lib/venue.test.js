import * as venueLib from '_src/lib/venue'

describe('getPostcodeDistrict', () => {
  const tests = [
    {
      arg: 'N4 2EP',
      expected: 'N4'
    },
    {
      arg: 'W1W 3VV',
      expected: 'W1'
    },
    {
      arg: null,
      expected: null
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = venueLib.getPostcodeDistrict(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})
