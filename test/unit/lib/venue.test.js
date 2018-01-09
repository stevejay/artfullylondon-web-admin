import * as venue from '_admin/lib/venue'

describe('formatAddressForDisplay', () => {
  const tests = [
    {
      args: {
        address: '1 Foo Street',
        postcode: 'N4 2EP'
      },
      expected: '1 Foo Street, N4 2EP'
    },
    {
      args: {
        address: '1 Foo Street\nChiswick\nLondon',
        postcode: 'N4 2EP'
      },
      expected: '1 Foo Street, Chiswick, London, N4 2EP'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = venue.formatAddressForDisplay(
        test.args.address,
        test.args.postcode
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('getPostcodeDistrict', () => {
  const tests = [
    {
      arg: 'N4 2EP',
      expected: 'N4'
    },
    {
      arg: 'W1W 3VV',
      expected: 'W1'
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = venue.getPostcodeDistrict(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})
