import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './event'
import * as eventActions from '../actions'
import { actions as tagActions } from '_src/modules/tag'

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
})
