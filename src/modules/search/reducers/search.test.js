import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './search'
import * as searchActions from '../actions'
import * as searchConstants from '../constants'
import entityType from '_src/entities/entity-type'
import { actions as userActions } from '_src/modules/user'
import { SummaryEvent } from '_src/entities/event'
import { SummaryEventSeries } from '_src/entities/event-series'
import { SummaryTalent } from '_src/entities/talent'
import { SummaryVenue } from '_src/entities/venue'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })
})

it('should handle a set basic search params message', () => {
  const state = deepFreeze({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })

  const actual = reducer(
    state,
    searchActions.setBasicSearchParams({ term: 'foo' })
  )

  expect(actual).toEqual({
    searchInProgress: false,
    basicSearchParams: { term: 'foo' },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })
})

it('should handle starting a basic search', () => {
  const state = deepFreeze({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })

  const actual = reducer(state, searchActions.startingBasicSearch())

  expect(actual).toEqual({
    searchInProgress: true,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })
})

it('should handle a basic search succeeding', () => {
  const state = deepFreeze({
    searchInProgress: true,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })

  const actual = reducer(
    state,
    searchActions.basicSearchSucceeded({
      total: 100,
      items: [
        { entityType: entityType.EVENT },
        { entityType: entityType.EVENT_SERIES },
        { entityType: entityType.VENUE },
        { entityType: entityType.TALENT }
      ],
      params: { the: 'params' }
    })
  )

  expect(actual).toEqual({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: { the: 'params' },
    total: 100,
    items: [
      new SummaryEvent({ entityType: entityType.EVENT }),
      new SummaryEventSeries({
        entityType: entityType.EVENT_SERIES
      }),
      new SummaryVenue({ entityType: entityType.VENUE }),
      new SummaryTalent({ entityType: entityType.TALENT })
    ]
  })
})

it('should handle a basic search failing', () => {
  const state = deepFreeze({
    searchInProgress: true,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })

  const actual = reducer(state, searchActions.basicSearchFailed())

  expect(actual).toEqual({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })
})

it('should handle a log out message', () => {
  const state = deepFreeze({
    searchInProgress: true,
    basicSearchParams: { term: 'foo' },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })

  const actual = reducer(state, userActions.loggedOut())

  expect(actual).toEqual({
    searchInProgress: false,
    basicSearchParams: {
      entityType: entityType.ALL,
      term: '',
      skip: 0,
      take: searchConstants.DEFAULT_TAKE
    },
    basicSearchResultParams: null,
    total: 0,
    items: null
  })
})

describe('selectors', () => {
  describe('basicSearchInProgress', () => {
    it('should get the value', () => {
      const state = { searchInProgress: true }
      const actual = selectors.basicSearchInProgress(state)
      expect(actual).toEqual(true)
    })
  })

  describe('basicSearchParams', () => {
    it('should get the value', () => {
      const state = { basicSearchParams: { term: 'foo' } }
      const actual = selectors.basicSearchParams(state)
      expect(actual).toEqual({ term: 'foo' })
    })
  })

  describe('basicSearchResultParams', () => {
    it('should get the value', () => {
      const state = { basicSearchResultParams: { term: 'foo' } }
      const actual = selectors.basicSearchResultParams(state)
      expect(actual).toEqual({ term: 'foo' })
    })
  })

  describe('basicSearchTotal', () => {
    it('should get the value', () => {
      const state = { total: 200 }
      const actual = selectors.basicSearchTotal(state)
      expect(actual).toEqual(200)
    })
  })

  describe('basicSearchItems', () => {
    it('should get the value', () => {
      const state = { items: [{ id: 1 }] }
      const actual = selectors.basicSearchItems(state)
      expect(actual).toEqual([{ id: 1 }])
    })
  })
})
