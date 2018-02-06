import moment from 'moment'

import * as searchLib from './search'

describe('createAutocompleteSearchRequestUrl', () => {
  const tests = [
    {
      it: 'should handle a request with only a term',
      arg: { term: 'foo' },
      expected: 'https://api.test.com/search-service/admin/search/auto?term=foo'
    },
    {
      it: 'should handle a request with only an entity type',
      arg: { entityType: 'venue' },
      expected: 'https://api.test.com/search-service/admin/search/auto?entityType=venue'
    },
    {
      it: 'should handle a request with a term and an entity type',
      arg: { term: 'foo', entityType: 'venue' },
      expected: 'https://api.test.com/search-service/admin/search/auto?term=foo&entityType=venue'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.createAutocompleteSearchRequestUrl(test.arg)
      expect(actual).toEqual(test.expected)
    })
  })
})

describe('createBasicSearchRequestUrl', () => {
  const tests = [
    {
      it: 'should handle query with no skip and take',
      args: { query: { term: 'foo' } },
      expected: 'https://api.test.com/search-service/admin/search/basic?term=foo&take=12'
    },
    {
      it: 'should handle query with skip and take in query',
      args: { query: { term: 'foo', skip: 1, take: 2 } },
      expected: 'https://api.test.com/search-service/admin/search/basic?term=foo&skip=1&take=2'
    },
    {
      it: 'should handle query with skip and take overrides',
      args: { query: { term: 'foo', skip: 1, take: 2 }, skip: 10, take: 20 },
      expected: 'https://api.test.com/search-service/admin/search/basic?term=foo&skip=10&take=20'
    },
    {
      it: 'should handle query with an entity type',
      args: { query: { entityType: 'event' }, skip: 10, take: 20 },
      expected: 'https://api.test.com/search-service/admin/search/basic?entityType=event&skip=10&take=20'
    },
    {
      it: 'should handle query with a null term',
      args: { query: { term: null } },
      expected: 'https://api.test.com/search-service/admin/search/basic?take=12'
    }
  ]

  tests.map(test => {
    it(test.it, () => {
      const actual = searchLib.createBasicSearchRequestUrl(
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
      it: 'should handle a valid search with JS date decoding required',
      args: {
        baseUrl: 'http://search.com/search',
        query: { from: new Date(1238267253) }
      },
      expected: 'http://search.com/search?from=1970%2F01%2F15&take=12'
    },
    {
      it: 'should handle a valid search with moment date decoding required',
      args: {
        baseUrl: 'http://search.com/search',
        query: { from: moment(1238267253) }
      },
      expected: 'http://search.com/search?from=1970%2F01%2F15&take=12'
    },
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
        entityType: 'event',
        items: [
          { entityType: 'event' },
          { entityType: 'event' },
          { entityType: 'event' },
          { entityType: 'event' },
          { entityType: 'event' },
          { entityType: 'event' }
        ],
        take: 12
      },
      expected: true
    },
    {
      it: 'should handle search results that does not have more results',
      args: {
        entityType: 'event',
        items: [{ entityType: 'event' }, { entityType: 'event' }],
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
