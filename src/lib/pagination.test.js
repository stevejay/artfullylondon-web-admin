import * as pagination from '_src/lib/pagination'

describe('showGoToFirstPageLink', () => {
  const tests = [
    {
      args: { totalPages: 1, pageNumber: 1, currentPageNumber: 1 },
      expected: false
    },
    {
      args: { totalPages: 100, pageNumber: 1, currentPageNumber: 3 },
      expected: false
    },
    {
      args: { totalPages: 100, pageNumber: 1, currentPageNumber: 4 },
      expected: true
    },
    {
      args: { totalPages: 100, pageNumber: 2, currentPageNumber: 4 },
      expected: false
    },
    {
      args: { totalPages: 6, pageNumber: 1, currentPageNumber: 4 },
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = pagination.showGoToFirstPageLink(
        test.args.totalPages,
        test.args.pageNumber,
        test.args.currentPageNumber
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('showGoToLastPageLink', () => {
  const tests = [
    {
      args: { totalPages: 1, pageNumber: 1, currentPageNumber: 1 },
      expected: false
    },
    {
      args: { totalPages: 100, pageNumber: 100, currentPageNumber: 100 },
      expected: false
    },
    {
      args: { totalPages: 100, pageNumber: 100, currentPageNumber: 98 },
      expected: false
    },
    {
      args: { totalPages: 100, pageNumber: 100, currentPageNumber: 97 },
      expected: true
    },
    {
      args: { totalPages: 100, pageNumber: 99, currentPageNumber: 97 },
      expected: false
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = pagination.showGoToLastPageLink(
        test.args.totalPages,
        test.args.pageNumber,
        test.args.currentPageNumber
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('getPaginationRange', () => {
  const tests = [
    {
      args: { totalPages: 1, currentPageNumber: 1 },
      expected: [1]
    },
    {
      args: { totalPages: 6, currentPageNumber: 1 },
      expected: [1, 2, 3, 4, 5, 6]
    },
    {
      args: { totalPages: 100, currentPageNumber: 1 },
      expected: [1, 2, 3, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 2 },
      expected: [1, 2, 3, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 3 },
      expected: [1, 2, 3, 4, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 4 },
      expected: [1, 3, 4, 5, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 97 },
      expected: [1, 96, 97, 98, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 98 },
      expected: [1, 97, 98, 99, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 99 },
      expected: [1, 98, 99, 100]
    },
    {
      args: { totalPages: 100, currentPageNumber: 100 },
      expected: [1, 98, 99, 100]
    }
  ]

  tests.map(test => {
    it(`should return ${JSON.stringify(test.expected)} when passed ${JSON.stringify(test.args)}`, () => {
      const actual = pagination.getPaginationRange(
        test.args.totalPages,
        test.args.currentPageNumber
      )

      expect(actual).toEqual(test.expected)
    })
  })
})
