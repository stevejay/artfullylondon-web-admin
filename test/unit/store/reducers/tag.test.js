import deepFreeze from 'deep-freeze'

import tagReducer from '_src/store/reducers/tag'
import * as tagActions from '_src/store/actions/tag'

it('should have the correct initial state', () => {
  const actual = tagReducer(undefined, {})

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

  const actual = tagReducer(state, tagActions.getTagsStarted('medium'))

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

  const actual = tagReducer(state, tagActions.getTagsSucceeded([{ id: 1 }]))

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

  const actual = tagReducer(state, tagActions.getTagsFailed())

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

  const actual = tagReducer(state, tagActions.addTagStarted())

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

  const actual = tagReducer(state, tagActions.addTagSucceeded({ id: 2 }))

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

  const actual = tagReducer(state, tagActions.addTagFailed())

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

  const actual = tagReducer(state, tagActions.deleteTagStarted())

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

  const actual = tagReducer(state, tagActions.deleteTagSucceeded(1))

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

  const actual = tagReducer(state, tagActions.deleteTagFailed())

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})
