import * as searchLib from './search'
import entityType from '_src/domain/types/entity-type'
import * as globalConstants from '_src/shared/constants'

describe('createAutocompleteQueryStringParams', () => {
  const tests = [
    {
      it: 'should handle a term',
      arg: { term: 'foo' },
      expected: { term: 'foo' }
    },
    {
      it: 'should handle an entityType',
      arg: { entityType: entityType.EVENT },
      expected: { entityType: entityType.EVENT }
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.createAutocompleteQueryStringParams(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createBasicSearchQueryStringParams', () => {
  const tests = [
    {
      it: 'should handle a term',
      args: { query: { term: 'foo' } },
      expected: { term: 'foo', take: globalConstants.DEFAULT_TAKE }
    },
    {
      it: 'should handle an entityType',
      args: { query: { entityType: entityType.EVENT } },
      expected: {
        entityType: entityType.EVENT,
        take: globalConstants.DEFAULT_TAKE
      }
    },
    {
      it: 'should handle no skip',
      args: { query: {} },
      expected: { take: globalConstants.DEFAULT_TAKE }
    },
    {
      it: 'should handle query skip',
      args: { query: { skip: 5 } },
      expected: { skip: 5, take: globalConstants.DEFAULT_TAKE }
    },
    {
      it: 'should handle arg skip',
      args: { query: { skip: 5 }, skip: 10 },
      expected: { skip: 10, take: globalConstants.DEFAULT_TAKE }
    },
    {
      it: 'should handle no take',
      args: { query: {} },
      expected: { take: globalConstants.DEFAULT_TAKE }
    },
    {
      it: 'should handle query take',
      args: { query: { take: 5 } },
      expected: { take: 5 }
    },
    {
      it: 'should handle arg take',
      args: { query: { take: 5 }, take: 10 },
      expected: { take: 10 }
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.createBasicSearchQueryStringParams(
        test.args.query,
        test.args.skip,
        test.args.take
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createSearchPageUrl', () => {
  const tests = [
    {
      it: 'should handle a valid search with uri encoding required',
      args: {
        baseUrl: 'http://search.com/search',
        query: { 'foo/bar': 'bat/bar' }
      },
      expected: 'http://search.com/search?foo%2Fbar=bat%2Fbar&take=12'
    },
    {
      it: 'should handle a valid search with no skip or take',
      args: {
        baseUrl: 'http://search.com/search',
        query: { q: 'almeida' }
      },
      expected: 'http://search.com/search?q=almeida&take=12'
    },
    {
      it: 'should handle a valid search with skip and take overrides',
      args: {
        baseUrl: 'http://search.com/search',
        query: { q: 'almeida', skip: 1, take: 2 }
      },
      expected: 'http://search.com/search?q=almeida&skip=1&take=2'
    },
    {
      it: 'should handle a valid search with skip and take overrides',
      args: {
        baseUrl: 'http://search.com/search',
        query: { q: 'almeida', skip: 1, take: 2 },
        skip: 20,
        take: 10
      },
      expected: 'http://search.com/search?q=almeida&skip=20&take=10'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.createSearchPageUrl(
        test.args.baseUrl,
        test.args.query,
        test.args.skip,
        test.args.take
      )

      expect(actual).toEqual(test.expected)
    })
  })
})

describe('maybeHasMoreSearchResults', () => {
  const tests = [
    {
      it: 'should handle search results that may have more results',
      args: {
        entityType: entityType.EVENT,
        items: [
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT }
        ],
        take: 12
      },
      expected: true
    },
    {
      it: 'should handle search results that does not have more results',
      args: {
        entityType: entityType.EVENT,
        items: [
          { entityType: entityType.EVENT },
          { entityType: entityType.EVENT }
        ],
        take: 12
      },
      expected: false
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.maybeHasMoreSearchResults(
        test.args.entityType,
        test.args.items,
        test.args.take
      )

      expect(actual).toEqual(test.expected)
    })
  })
})
