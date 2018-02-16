import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './venue-monitor'
import * as venueActions from '../actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    monitors: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle starting to get a venue monitor', () => {
  const state = deepFreeze({
    monitors: null,
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueMonitorsStarted())

  expect(actual).toEqual({
    monitors: null,
    getInProgress: true,
    getFailed: false
  })
})

it('should handle successfully getting a venue monitor', () => {
  const state = deepFreeze({
    monitors: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.getVenueMonitorsSucceeded([{ key: 'some-key' }])
  )

  expect(actual).toEqual({
    monitors: [{ key: 'some-key' }],
    getInProgress: false,
    getFailed: false
  })
})

it('should handle failing to get a venue monitor', () => {
  const state = deepFreeze({
    monitors: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueMonitorsFailed())

  expect(actual).toEqual({
    monitors: null,
    getInProgress: false,
    getFailed: true
  })
})

it('should handle successfully updating a venue monitor', () => {
  const state = deepFreeze({
    monitors: [{ key: 'some-key', isIgnored: false }],
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.updateVenueMonitorSucceeded({
      key: 'some-key',
      isIgnored: true
    })
  )

  expect(actual).toEqual({
    monitors: [{ key: 'some-key', isIgnored: true }],
    getInProgress: false,
    getFailed: false
  })
})

it('should ignore updating a non-existent venue monitor', () => {
  const state = deepFreeze({
    monitors: [{ key: 'some-key', isIgnored: false }],
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.updateVenueMonitorSucceeded({
      key: 'some-nonexistent-key',
      isIgnored: true
    })
  )

  expect(actual).toEqual({
    monitors: [{ key: 'some-key', isIgnored: false }],
    getInProgress: false,
    getFailed: false
  })
})

describe('selectors', () => {
  describe('venueMonitors', () => {
    it('should get the value', () => {
      const state = { monitors: { key: 'some-key' } }
      const actual = selectors.venueMonitors(state)
      expect(actual).toEqual({ key: 'some-key' })
    })
  })

  describe('gettingVenueMonitors', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const actual = selectors.gettingVenueMonitors(state)
      expect(actual).toEqual(true)
    })
  })

  describe('failedToGetVenueMonitors', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const actual = selectors.failedToGetVenueMonitors(state)
      expect(actual).toEqual(true)
    })
  })
})
