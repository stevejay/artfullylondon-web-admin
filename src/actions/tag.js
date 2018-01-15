import { createAction } from 'redux-actions'
import * as tagActionsTypes from '_src/constants/actions/tag'

export const getAllTags = createAction(tagActionsTypes.GET_ALL_TAGS)
export const getTags = createAction(tagActionsTypes.GET_TAGS)
export const addTag = createAction(tagActionsTypes.ADD_TAG)
export const deleteTag = createAction(tagActionsTypes.DELETE_TAG)
