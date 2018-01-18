import { createAction } from 'redux-actions'
import * as notificationActionTypes from '_src/constants/action/notification'

export const addNotification = createAction(
  notificationsActionTypes.ADD_NOTIFICATION
)
export const removeNotification = createAction(
  notificationsActionTypes.REMOVE_NOTIFICATION
)
