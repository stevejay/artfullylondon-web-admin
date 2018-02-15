import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './venue-event-monitors'
import * as venueActions from '_src/modules/venue/actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    venueEventMonitors: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle starting to get the venue event monitors', () => {
  const state = deepFreeze({
    venueEventMonitors: null,
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueEventMonitorsStarted())

  expect(actual).toEqual({
    venueEventMonitors: null,
    getInProgress: true,
    getFailed: false
  })
})

it('should handle successfully getting the venue event monitors', () => {
  const state = deepFreeze({
    venueEventMonitors: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.getVenueEventMonitorsSucceeded([{ id: 'some-id' }])
  )

  expect(actual).toEqual({
    venueEventMonitors: [{ id: 'some-id' }],
    getInProgress: false,
    getFailed: false
  })
})

it('should handle failing to get the venue event monitors', () => {
  const state = deepFreeze({
    venueEventMonitors: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(state, venueActions.getVenueEventMonitorsFailed())

  expect(actual).toEqual({
    venueEventMonitors: null,
    getInProgress: false,
    getFailed: true
  })
})

it('should handle successfully updating a venue event monitor', () => {
  const state = deepFreeze({
    venueEventMonitors: [
      { externalEventId: 'some-external-id' },
      { externalEventId: 'some-other-external-id' }
    ],
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.updateVenueEventMonitorSucceeded({
      externalEventId: 'some-external-id',
      isIgnored: false,
      hasChanged: true
    })
  )

  expect(actual).toEqual({
    venueEventMonitors: [
      {
        externalEventId: 'some-external-id',
        isIgnored: false,
        hasChanged: true
      },
      { externalEventId: 'some-other-external-id' }
    ],
    getInProgress: false,
    getFailed: false
  })
})

it('should handle updating a venue event monitor when that monitor does not exist', () => {
  const state = deepFreeze({
    venueEventMonitors: [{ externalEventId: 'some-other-external-id' }],
    getInProgress: false,
    getFailed: false
  })

  const actual = reducer(
    state,
    venueActions.updateVenueEventMonitorSucceeded({
      externalEventId: 'some-external-id',
      isIgnored: false,
      hasChanged: true
    })
  )

  expect(actual).toEqual({
    venueEventMonitors: [{ externalEventId: 'some-other-external-id' }],
    getInProgress: false,
    getFailed: false
  })
})

describe('selectors', () => {
  describe('venueEventMonitors', () => {
    it('should get the value', () => {
      const state = { venueEventMonitors: [{ id: 'some-id' }] }
      const actual = selectors.venueEventMonitors(state)
      expect(actual).toEqual([{ id: 'some-id' }])
    })
  })

  describe('gettingVenueEventMonitors', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const actual = selectors.gettingVenueEventMonitors(state)
      expect(actual).toEqual(true)
    })
  })

  describe('failedToGetVenueEventMonitors', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const actual = selectors.failedToGetVenueEventMonitors(state)
      expect(actual).toEqual(true)
    })
  })

  describe('hasIgnoredVenueEventMonitors', () => {
    it('should get the value when there are ignored monitors', () => {
      const state = { venueEventMonitors: [{ id: 'some-id', isIgnored: true }] }
      const actual = selectors.hasIgnoredVenueEventMonitors(state)
      expect(actual).toEqual(true)
    })

    it('should get the value when there are no ignored monitors', () => {
      const state = {
        venueEventMonitors: [{ id: 'some-id', isIgnored: false }]
      }

      const actual = selectors.hasIgnoredVenueEventMonitors(state)
      expect(actual).toEqual(false)
    })
  })
})
