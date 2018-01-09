import { createAction } from 'redux-actions'
import * as types from '_src/constants/tag'

export const getAllTags = createAction(types.GET_ALL_TAGS)
export const getTags = createAction(types.GET_TAGS)
export const addTag = createAction(types.ADD_TAG)
export const deleteTag = createAction(types.DELETE_TAG)
