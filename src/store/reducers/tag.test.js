import deepFreeze from 'deep-freeze'

import { reducer, selectors } from '_src/store/reducers/tag'
import { tagActions } from '_src/store'

it('should have the correct initial state', () => {
  const actual = reducer(undefined, {})

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: null,
    tags: null
  })
})

it('should handle a get tags started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: null,
    tags: null
  })

  const actual = reducer(state, tagActions.getTagsStarted('medium'))

  expect(actual).toEqual({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: null
  })
})

it('should handle a get tags succeeded message', () => {
  const state = deepFreeze({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: null
  })

  const actual = reducer(state, tagActions.getTagsSucceeded([{ id: 1 }]))

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})

it('should handle a get tags failed message', () => {
  const state = deepFreeze({
    getInProgress: true,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: null
  })

  const actual = reducer(state, tagActions.getTagsFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: true,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: null
  })
})

it('should handle an add tag started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.addTagStarted())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})

it('should handle an add tag succeeded message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.addTagSucceeded({ id: 2 }))

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }, { id: 2 }]
  })
})

it('should handle an add tag failed message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: true,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.addTagFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})

it('should handle a delete tag started message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.deleteTagStarted())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})

it('should handle a delete tag succeeded message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.deleteTagSucceeded(1))

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: []
  })
})

it('should handle a delete tag failed message', () => {
  const state = deepFreeze({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: true,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })

  const actual = reducer(state, tagActions.deleteTagFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})

describe('selectors', () => {
  describe('getTagsForType', () => {
    it('should return null when the reducer is not for the requested tag type', () => {
      const state = { tag: { tagType: 'medium', tags: [{ id: 1 }] } }
      const result = selectors.getTagsForType(state, 'audience')
      expect(result).toEqual(null)
    })

    it('should return null when the reducer tags are for the requested tag type but are null', () => {
      const state = { tag: { tagType: 'medium', tags: null } }
      const result = selectors.getTagsForType(state, 'medium')
      expect(result).toEqual(null)
    })

    it('should return empty tags when the reducer tags are for the requested tag type but are empty', () => {
      const state = { tag: { tagType: 'medium', tags: [] } }
      const result = selectors.getTagsForType(state, 'medium')
      expect(result).toEqual([])
    })

    it('should return populated tags when the reducer tags are for the requested tag type and are not empty', () => {
      const state = { tag: { tagType: 'medium', tags: [{ id: 1 }] } }
      const result = selectors.getTagsForType(state, 'medium')
      expect(result).toEqual([{ id: 1 }])
    })
  })
})
