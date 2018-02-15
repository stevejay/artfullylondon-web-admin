import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './entity'
import * as entityActions from '_src/modules/entity/actions'
import { FullTalent } from '_src/entities/talent'

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

it('should handle successfully getting an entity', () => {
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
