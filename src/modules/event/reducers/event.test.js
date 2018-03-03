import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './event'
import { actions as entityActions } from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'
import * as eventActions from '../actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    selectedTalentId: null
  })
})

it('should handle updating the selected talent', () => {
  const state = deepFreeze({
    selectedTalentId: null
  })

  const actual = reducer(
    state,
    eventActions.updateSelectedTalent('some-talent-id')
  )

  expect(actual).toEqual({ selectedTalentId: 'some-talent-id' })
})

it('should handle resetting when event entity is being reset', () => {
  const state = deepFreeze({
    selectedTalentId: 123
  })

  const actual = reducer(
    state,
    entityActions.resetEntityForCreate(entityType.EVENT)
  )

  expect(actual).toEqual({
    selectedTalentId: null
  })
})

it('should not reset when non-event entity is being reset', () => {
  const state = deepFreeze({
    selectedTalentId: 123
  })

  const actual = reducer(
    state,
    entityActions.resetEntityForCreate(entityType.VENUE)
  )

  expect(actual).toEqual({
    selectedTalentId: 123
  })
})

it('should handle resetting when event entity is being loaded', () => {
  const state = deepFreeze({
    selectedTalentId: 123
  })

  const actual = reducer(state, entityActions.getEntity(entityType.EVENT))

  expect(actual).toEqual({
    selectedTalentId: null
  })
})

it('should not reset when non-event entity is being loaded', () => {
  const state = deepFreeze({
    selectedTalentId: 123
  })

  const actual = reducer(state, entityActions.getEntity(entityType.TALENT))

  expect(actual).toEqual({
    selectedTalentId: 123
  })
})

describe('selectors', () => {
  describe('selectedTalentId', () => {
    it('should get the value', () => {
      const state = { selectedTalentId: 2 }
      const actual = selectors.selectedTalentId(state)
      expect(actual).toEqual(2)
    })
  })
})
