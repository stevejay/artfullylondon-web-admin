export const types = {
  ADD_NOTIFICATION: 'notification/ADD_NOTIFICATION',
  NOTIFICATION_ADDED: 'notification/NOTIFICATION_ADDED',
  REMOVE_NOTIFICATION: 'notification/REMOVE_NOTIFICATION'
}

export const addNotification = (type, title, message) => ({
  type: types.ADD_NOTIFICATION,
  payload: { type, title, message }
})

export const notificationAdded = values => ({
  type: types.NOTIFICATION_ADDED,
  payload: values
})

export const removeNotification = id => ({
  type: types.REMOVE_NOTIFICATION,
  payload: { id }
})
