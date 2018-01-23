import { createAction } from 'redux-actions'
import * as notificationActionTypes from '_src/constants/action/notification'

export const addNotification = createAction(
  notificationActionTypes.ADD_NOTIFICATION
)
export const removeNotification = createAction(
  notificationActionTypes.REMOVE_NOTIFICATION
)
