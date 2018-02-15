import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './venue-monitor'
import * as venueActions from '_src/modules/venue/actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    venueMonitor: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle starting to get a venue monitor', () => {
  const state = deepFreeze({
    venueMonitor: null,
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueMonitorStarted())

  expect(actual).toEqual({
    venueMonitor: null,
    getInProgress: true,
    getFailed: false
  })
})

it('should handle successfully getting a venue monitor', () => {
  const state = deepFreeze({
    venueMonitor: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.getVenueMonitorSucceeded({ id: 'some-id' })
  )

  expect(actual).toEqual({
    venueMonitor: { id: 'some-id' },
    getInProgress: false,
    getFailed: false
  })
})

it('should handle failing to get a venue monitor', () => {
  const state = deepFreeze({
    venueMonitor: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueMonitorFailed())

  expect(actual).toEqual({
    venueMonitor: null,
    getInProgress: false,
    getFailed: true
  })
})

it('should handle successfully updating a venue monitor', () => {
  const state = deepFreeze({
    venueMonitor: { id: 'some-id' },
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.updateVenueMonitorSucceeded({ id: 'some-other-id' })
  )

  expect(actual).toEqual({
    venueMonitor: { id: 'some-other-id' },
    getInProgress: false,
    getFailed: false
  })
})

describe('selectors', () => {
  describe('venueMonitor', () => {
    it('should get the value', () => {
      const state = { venueMonitor: { id: 'some-id' } }
      const actual = selectors.venueMonitor(state)
      expect(actual).toEqual({ id: 'some-id' })
    })
  })

  describe('gettingVenueMonitor', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const actual = selectors.gettingVenueMonitor(state)
      expect(actual).toEqual(true)
    })
  })

  describe('failedToGetVenueMonitor', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const actual = selectors.failedToGetVenueMonitor(state)
      expect(actual).toEqual(true)
    })
  })
})
