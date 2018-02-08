import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './entity-for-edit'
import * as entityActions from '_src/modules/entity/actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: false
  })
})

it('should handle resetting an entity for edit', () => {
  const state = deepFreeze({
    entityId: 'some-id',
    entity: { name: 'foo' },
    getInProgress: true,
    getFailed: true
  })

  const actual = reducer(state, entityActions.resetEntityForEdit('talent'))

  expect(actual.entityId).toEqual(null)
  expect(actual.entity).not.toEqual(null)
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
    entityActions.getEntityForEditStarted('talent', 'some-talent-id')
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
    entityActions.getEntityForEditSucceeded('talent', {
      id: 'server-id',
      entityType: 'talent'
    })
  )

  expect(actual.entityId).toEqual('some-talent-id')
  expect(actual.entity).not.toEqual(null)
  expect(actual.getInProgress).toEqual(false)
  expect(actual.getFailed).toEqual(false)
})

it('should handle failing to get an entity', () => {
  const state = deepFreeze({
    entityId: 'some-talent-id',
    entity: null,
    getInProgress: true,
    getFailed: false
  })

  const actual = reducer(state, entityActions.getEntityForEditFailed('talent'))

  expect(actual).toEqual({
    entityId: null,
    entity: null,
    getInProgress: false,
    getFailed: true
  })
})

describe('selectors', () => {
  describe('entityForEdit', () => {
    it('should get the value', () => {
      const state = { entity: { name: 'foo' } }
      const actual = selectors.entityForEdit(state)
      expect(actual).toEqual({ name: 'foo' })
    })
  })

  describe('entityForEditId', () => {
    it('should get the value', () => {
      const state = { entityId: 'some-id' }
      const actual = selectors.entityForEditId(state)
      expect(actual).toEqual('some-id')
    })
  })

  describe('gettingEntityForEdit', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const actual = selectors.gettingEntityForEdit(state)
      expect(actual).toEqual(true)
    })
  })

  describe('failedToGetEntityForEdit', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const actual = selectors.failedToGetEntityForEdit(state)
      expect(actual).toEqual(true)
    })
  })
})
