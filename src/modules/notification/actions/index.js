import * as notificationConstants from '_src/modules/notification/constants'

export const types = {
  ADD_NOTIFICATION: 'notification/ADD_NOTIFICATION',
  NOTIFICATION_ADDED: 'notification/NOTIFICATION_ADDED',
  REMOVE_NOTIFICATION: 'notification/REMOVE_NOTIFICATION'
}

export const addSuccessNotification = (title, message) => ({
  type: types.ADD_NOTIFICATION,
  payload: {
    type: notificationConstants.NOTIFICATION_TYPE_SUCCESS,
    title,
    message
  }
})

export const addErrorNotification = (title, message) => ({
  type: types.ADD_NOTIFICATION,
  payload: {
    type: notificationConstants.NOTIFICATION_TYPE_ERROR,
    title,
    message
  }
})

export const notificationAdded = values => ({
  type: types.NOTIFICATION_ADDED,
  payload: values
})

export const removeNotification = id => ({
  type: types.REMOVE_NOTIFICATION,
  payload: { id }
})
