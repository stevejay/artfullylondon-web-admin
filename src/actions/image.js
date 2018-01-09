import { createAction } from 'redux-actions'
import * as types from '_src/constants/image'

export const addImage = createAction(types.ADD_IMAGE)
export const setMainImage = createAction(types.SET_MAIN_IMAGE)
export const updateImage = createAction(types.UPDATE_IMAGE)
export const deleteImage = createAction(types.DELETE_IMAGE)
