import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './event'
import { actions as tagActions } from '_src/modules/tag'
import { actions as entityActions } from '_src/modules/entity'
import entityType from '_src/domain/types/entity-type'
import * as eventActions from '../actions'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: null
  })
})

it('should handle updating the selected talent', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: null
  })

  const actual = reducer(
    state,
    eventActions.updateSelectedTalent('some-talent-id')
  )

  expect(actual).toEqual({ selectedTalentId: 'some-talent-id', tags: null })
})

it('should handle getting the tags', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: null
  })

  const actual = reducer(
    state,
    eventActions.getAllTagsSucceeded({ medium: [{ id: 'a', label: 'A' }] })
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: { medium: [{ id: 'a', label: 'A' }] }
  })
})

it('should handle adding a tag', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: {
      medium: [{ id: 'a', label: 'A' }],
      style: [{ id: 'b', label: 'B' }]
    }
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 'c', label: 'C' }, 'style')
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: {
      medium: [{ id: 'a', label: 'A' }],
      style: [{ id: 'b', label: 'B' }, { id: 'c', label: 'C' }]
    }
  })
})

it('should handle adding a tag when the tag type does not exist', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: {
      medium: [{ id: 'a', label: 'A' }],
      style: [{ id: 'b', label: 'B' }]
    }
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 'c', label: 'C' }, 'audience')
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: {
      medium: [{ id: 'a', label: 'A' }],
      style: [{ id: 'b', label: 'B' }]
    }
  })
})

it('should handle adding a tag when there are no tags', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: null
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 'c', label: 'C' }, 'audience')
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: null
  })
})

it('should handle resetting when event entity is being reset', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: { medium: [] }
  })

  const actual = reducer(
    state,
    entityActions.resetEntityForCreate(entityType.EVENT)
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: null
  })
})

it('should not reset when non-event entity is being reset', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: { medium: [] }
  })

  const actual = reducer(
    state,
    entityActions.resetEntityForCreate(entityType.VENUE)
  )

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: { medium: [] }
  })
})

it('should handle resetting when event entity is being loaded', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: { medium: [] }
  })

  const actual = reducer(state, entityActions.getEntity(entityType.EVENT))

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: null
  })
})

it('should not reset when non-event entity is being loaded', () => {
  const state = deepFreeze({
    selectedTalentId: null,
    tags: { medium: [] }
  })

  const actual = reducer(state, entityActions.getEntity(entityType.TALENT))

  expect(actual).toEqual({
    selectedTalentId: null,
    tags: { medium: [] }
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

  describe('tags', () => {
    it('should get the value', () => {
      const state = { tags: { medium: [{ id: 'a', label: 'A' }] } }
      const actual = selectors.tags(state)
      expect(actual).toEqual({ medium: [{ id: 'a', label: 'A' }] })
    })
  })

  describe('hasTags', () => {
    it('should get the value when has tags', () => {
      const state = { tags: { medium: [{ id: 'a', label: 'A' }] } }
      const actual = selectors.hasTags(state)
      expect(actual).toEqual(true)
    })

    it('should get the value when has no tags', () => {
      const state = { tags: null }
      const actual = selectors.hasTags(state)
      expect(actual).toEqual(false)
    })
  })
})
