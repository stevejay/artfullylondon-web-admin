import { createAction } from 'redux-actions'
import * as types from '_src/constants/link'

export const addLink = createAction(types.ADD_LINK)
export const deleteLink = createAction(types.DELETE_LINK)
