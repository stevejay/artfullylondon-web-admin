import deepFreeze from 'deep-freeze'

import { reducer, selectors } from '_src/modules/dashboard/reducers/dashboard'
import * as dashboardActions from '_src/modules/dashboard/actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    entityCounts: [],
    getEntityCountsInProgress: false,
    getEntityCountsFailed: false
  })
})

it('should handle a started message', () => {
  const state = deepFreeze({
    entityCounts: [],
    getEntityCountsInProgress: false,
    getEntityCountsFailed: false
  })

  const actual = reducer(state, dashboardActions.getEntityCountsStarted())

  expect(actual).toEqual({
    entityCounts: [],
    getEntityCountsInProgress: true,
    getEntityCountsFailed: false
  })
})

it('should handle a succeeded message', () => {
  const state = deepFreeze({
    entityCounts: [],
    getEntityCountsInProgress: true,
    getEntityCountsFailed: false
  })

  const actual = reducer(
    state,
    dashboardActions.getEntityCountsSucceeded({
      items: [{ entityType: 'venue', count: 100 }]
    })
  )

  expect(actual).toEqual({
    entityCounts: [
      { entityType: 'venue', count: 100, value: 100, label: 'Venue' }
    ],
    getEntityCountsInProgress: false,
    getEntityCountsFailed: false
  })
})

it('should handle a failed message', () => {
  const state = deepFreeze({
    entityCounts: [],
    getEntityCountsInProgress: true,
    getEntityCountsFailed: false
  })

  const actual = reducer(state, dashboardActions.getEntityCountsFailed())

  expect(actual).toEqual({
    entityCounts: [],
    getEntityCountsInProgress: false,
    getEntityCountsFailed: true
  })
})

describe('selectors', () => {
  describe('entityCounts', () => {
    it('should return the current value', () => {
      const state = { entityCounts: [{ count: 2 }] }
      const result = selectors.entityCounts(state)
      expect(result).toEqual([{ count: 2 }])
    })
  })

  describe('gettingEntityCounts', () => {
    it('should return the current value', () => {
      const state = { getEntityCountsInProgress: true }
      const result = selectors.gettingEntityCounts(state)
      expect(result).toEqual(true)
    })
  })

  describe('failedToGetEntityCounts', () => {
    it('should return the current value', () => {
      const state = { getEntityCountsFailed: true }
      const result = selectors.failedToGetEntityCounts(state)
      expect(result).toEqual(true)
    })
  })
})
