import { createAction } from 'redux-actions'
import * as types from '_src/constants/notifications'

export const addNotification = createAction(types.ADD_NOTIFICATION)
export const removeNotification = createAction(types.REMOVE_NOTIFICATION)
