import deepFreeze from 'deep-freeze'

import { reducer, selectors } from './tag'
import * as tagActions from '../actions'
import tagType from '_src/domain/types/tag-type'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })
})

it('should handle a get tags started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })

  const actual = reducer(state, tagActions.getTagsStarted(tagType.MEDIUM))

  expect(actual).toEqual({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })
})

it('should handle a get tags succeeded message', () => {
  const state = deepFreeze({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })

  const actual = reducer(
    state,
    tagActions.getTagsSucceeded({ medium: [{ id: 1 }] })
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })
})

it('should handle a get tags failed message', () => {
  const state = deepFreeze({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })

  const actual = reducer(state, tagActions.getTagsFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: true,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })
})

it('should handle an add tag started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(state, tagActions.addTagStarted())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })
})

it('should handle an add tag succeeded message when the tag is to be added at the end of the list', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 2 }, tagType.MEDIUM)
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }, { id: 2 }] }
  })
})

it('should handle an add tag succeeded message when the tag is to be added at the start of the list', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: { medium: [{ id: 2 }] }
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 1 }, tagType.MEDIUM)
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }, { id: 2 }] }
  })
})

it('should handle an add tag succeeded message when the tag type to be added does not already have tags', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 2 }, tagType.AUDIENCE)
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }], audience: [{ id: 2 }] }
  })
})

it('should reject an add tag succeeded message when there are no tags', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: null
  })

  const actual = reducer(
    state,
    tagActions.addTagSucceeded({ id: 2 }, tagType.MEDIUM)
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })
})

it('should handle an add tag failed message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(state, tagActions.addTagFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })
})

it('should handle a delete tag started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(state, tagActions.deleteTagStarted())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: { medium: [{ id: 1 }] }
  })
})

it('should handle a delete tag succeeded message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: { medium: [{ id: 'medium/painting' }, { id: 'medium/sculpture' }] }
  })

  const actual = reducer(
    state,
    tagActions.deleteTagSucceeded('medium/painting')
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 'medium/sculpture' }] }
  })
})

it('should handle a delete tag succeeded message when the tag is not in the reducer', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: { medium: [{ id: 'medium/sculpture' }] }
  })

  const actual = reducer(
    state,
    tagActions.deleteTagSucceeded('medium/painting')
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 'medium/sculpture' }] }
  })
})

it('should handle a delete tag succeeded message when the tag type is not in the reducer', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: { audience: [{ id: 'audience/families' }] }
  })

  const actual = reducer(
    state,
    tagActions.deleteTagSucceeded('medium/painting')
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { audience: [{ id: 'audience/families' }] }
  })
})

it('should handle a delete tag succeeded message when there are no tags', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: null
  })

  const actual = reducer(
    state,
    tagActions.deleteTagSucceeded('medium/painting')
  )

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: null
  })
})

it('should handle a delete tag failed message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tags: { medium: [{ id: 1 }] }
  })

  const actual = reducer(state, tagActions.deleteTagFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tags: { medium: [{ id: 1 }] }
  })
})

describe('selectors', () => {
  describe('hasTags', () => {
    it('should return false when there are no tags', () => {
      const state = { tags: null }
      const result = selectors.hasTags(state)
      expect(result).toEqual(false)
    })

    it('should return true when there are tags', () => {
      const state = { tags: { medium: [{ id: 1 }] } }
      const result = selectors.hasTags(state)
      expect(result).toEqual(true)
    })
  })

  describe('getTagsForType', () => {
    it('should return null when the reducer tags are for the requested tag type but are null', () => {
      const state = { tags: null }
      const result = selectors.getTagsForType(state, tagType.MEDIUM)
      expect(result).toEqual(null)
    })

    it('should return empty tags when the reducer tags are for the requested tag type but are empty', () => {
      const state = { tags: { medium: [] } }
      const result = selectors.getTagsForType(state, tagType.MEDIUM)
      expect(result).toEqual([])
    })

    it('should return empty tags when the reducer has tags but not for the requested tag type', () => {
      const state = { tags: { audience: [{ id: 1 }] } }
      const result = selectors.getTagsForType(state, tagType.MEDIUM)
      expect(result).toEqual([])
    })

    it('should return populated tags when the reducer tags are for the requested tag type and are not empty', () => {
      const state = { tags: { medium: [{ id: 1 }] } }
      const result = selectors.getTagsForType(state, tagType.MEDIUM)
      expect(result).toEqual([{ id: 1 }])
    })
  })

  describe('gettingTags', () => {
    it('should get the value', () => {
      const state = { getInProgress: true }
      const result = selectors.gettingTags(state)
      expect(result).toEqual(true)
    })
  })

  describe('failedToGetTags', () => {
    it('should get the value', () => {
      const state = { getFailed: true }
      const result = selectors.failedToGetTags(state)
      expect(result).toEqual(true)
    })
  })

  describe('addingTag', () => {
    it('should get the value', () => {
      const state = { addInProgress: true }
      const result = selectors.addingTag(state)
      expect(result).toEqual(true)
    })
  })

  describe('deletingTag', () => {
    it('should get the value', () => {
      const state = { deleteInProgress: true }
      const result = selectors.deletingTag(state)
      expect(result).toEqual(true)
    })
  })
})
