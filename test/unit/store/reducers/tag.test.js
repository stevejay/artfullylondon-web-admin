import deepFreeze from 'deep-freeze'

import tagReducer from '_src/store/reducers/tag'
import * as tagActionTypes from '_src/constants/action/tag'

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

  const actual = tagReducer(state, {
    type: tagActionTypes.GET_TAGS_STARTED,
    payload: { tagType: 'medium' }
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.GET_TAGS_SUCCEEDED,
    payload: { tags: { medium: [{ id: 1 }] } }
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.GET_TAGS_FAILED
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.ADD_TAG_STARTED
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.ADD_TAG_SUCCEEDED,
    payload: { tag: { id: 2 } }
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.ADD_TAG_FAILED
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.DELETE_TAG_STARTED
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.DELETE_TAG_SUCCEEDED,
    payload: { id: 1 }
  })

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

  const actual = tagReducer(state, {
    type: tagActionTypes.DELETE_TAG_FAILED
  })

  expect(actual).toEqual({
    getInProgress: false,
    getFailed: false,
    addInProgress: false,
    deleteInProgress: false,
    tagType: 'medium',
    tags: [{ id: 1 }]
  })
})
