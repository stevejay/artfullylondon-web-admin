import * as routing from '_src/lib/routing'

describe('hasQuery', () => {
  const tests = [
    {
      arg: {
        query: {
          a: '1'
        }
      },
      expected: true
    },
    {
      arg: {
        query: {}
      },
      expected: false
    },
    {
      arg: {
        query: null
      },
      expected: false
    },
    {
      arg: {},
      expected: false
    },
    {
      arg: null,
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.arg)}`, () => {
      const actual = routing.hasQuery(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})
