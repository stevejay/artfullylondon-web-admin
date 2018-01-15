import { createAction } from 'redux-actions'
import * as tagActionTypes from '_src/constants/action/tag'

export const getAllTags = createAction(tagActionTypes.GET_ALL_TAGS)
export const getTags = createAction(tagActionTypes.GET_TAGS)
export const addTag = createAction(tagActionTypes.ADD_TAG)
export const deleteTag = createAction(tagActionTypes.DELETE_TAG)
