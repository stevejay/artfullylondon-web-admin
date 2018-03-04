import * as searchLib from './search'
import entityType from '_src/domain/types/entity-type'

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
