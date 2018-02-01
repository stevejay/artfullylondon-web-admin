import deepFreeze from 'deep-freeze'

import statusReducer from '_src/store/reducers/status'
import * as statusActions from '_src/store/actions/status'

it('should have the correct initial state', () => {
  const actual = statusReducer(undefined, {})

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

  const actual = statusReducer(state, statusActions.getEntityCountsStarted())

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

  const actual = statusReducer(
    state,
    statusActions.getEntityCountsSucceeded({
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

  const actual = statusReducer(state, statusActions.getEntityCountsFailed())

  expect(actual).toEqual({
    entityCounts: [],
    getEntityCountsInProgress: false,
    getEntityCountsFailed: true
  })
})
