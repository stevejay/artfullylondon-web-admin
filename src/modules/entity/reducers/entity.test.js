import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './entity'
import * as entityActions from '../actions'
import { FullEvent } from '_src/entities/event'
import { FullEventSeries } from '_src/entities/event-series'
import { FullTalent } from '_src/entities/talent'
import { FullVenue } from '_src/entities/venue'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle resetting an entity for create', () => {
  const state = deepFreeze({
    entityId: 'some-id',
    entity: { name: 'foo' },
    getInProgress: true,
    getFailed: true
  })

  const actual = reducer(state, entityActions.resetEntityForCreate('talent'))

  expect(actual.entityId).toEqual(null)
  expect(actual.entity).toEqual(new FullTalent())
  expect(actual.getInProgress).toEqual(false)
  expect(actual.getFailed).toEqual(false)
})

it('should handle clearing an entity', () => {
  const state = deepFreeze({
    entityId: 'some-id',
    entity: { name: 'foo' },
    getInProgress: true,
    getFailed: true
  })

  const actual = reducer(state, entityActions.clearEntity())

  expect(actual).toEqual({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle starting to get an entity', () => {
  const state = deepFreeze({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: true
  })

  const actual = reducer(
    state,
    entityActions.getEntityStarted('some-talent-id')
  )

  expect(actual).toEqual({
    entityId: 'some-talent-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })
})

it('should handle successfully getting a talent', () => {
  const state = deepFreeze({
    entityId: 'some-talent-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    entityActions.getEntitySucceeded('talent', {
      id: 'server-id',
      entityType: 'talent'
    })
  )

  expect(actual).toEqual({
    entityId: 'some-talent-id',
    entity: new FullTalent({ id: 'server-id', entityType: 'talent' }),
    getInProgress: false,
    getFailed: false
  })
})

it('should handle successfully getting a venue', () => {
  const state = deepFreeze({
    entityId: 'some-venue-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    entityActions.getEntitySucceeded('venue', {
      id: 'server-id',
      entityType: 'venue'
    })
  )

  expect(actual).toEqual({
    entityId: 'some-venue-id',
    entity: new FullVenue({ id: 'server-id', entityType: 'venue' }),
    getInProgress: false,
    getFailed: false
  })
})

it('should handle successfully getting an event series', () => {
  const state = deepFreeze({
    entityId: 'some-event-series-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    entityActions.getEntitySucceeded('event-series', {
      id: 'server-id',
      entityType: 'event-series'
    })
  )

  expect(actual).toEqual({
    entityId: 'some-event-series-id',
    entity: new FullEventSeries({
      id: 'server-id',
      entityType: 'event-series'
    }),
    getInProgress: false,
    getFailed: false
  })
})

it('should handle successfully getting an event', () => {
  const state = deepFreeze({
    entityId: 'some-event-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(
    state,
    entityActions.getEntitySucceeded('event', {
      id: 'server-id',
      entityType: 'event'
    })
  )

  expect(actual).toEqual({
    entityId: 'some-event-id',
    entity: new FullEvent({ id: 'server-id', entityType: 'event' }),
    getInProgress: false,
    getFailed: false
  })
})

it('should handle failing to get an entity', () => {
  const state = deepFreeze({
    entityId: 'some-talent-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(state, entityActions.getEntityFailed())

  expect(actual).toEqual({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: true
  })
})

describe('selectors', () => {
  describe('entity', () => {
    it('should get the value', () => {
      const state = { entity: { name: 'foo' } }
      const actual = selectors.entity(state)
      expect(actual).toEqual({ name: 'foo' })
    })
  })

  describe('entityId', () => {
    it('should get the value', () => {
      const state = { entityId: 'some-id' }
      const actual = selectors.entityId(state)
      expect(actual).toEqual('some-id')
    })
  })

  describe('gettingEntity', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const actual = selectors.gettingEntity(state)
      expect(actual).toEqual(true)
    })
  })

  describe('failedToGetEntity', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const actual = selectors.failedToGetEntity(state)
      expect(actual).toEqual(true)
    })
  })
})
