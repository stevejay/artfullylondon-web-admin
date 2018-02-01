export const types = {
  ADD_NOTIFICATION: 'notifications/ADD_NOTIFICATION',
  NOTIFICATION_ADDED: 'notifications/NOTIFICATION_ADDED',
  REMOVE_NOTIFICATION: 'notifications/REMOVE_NOTIFICATION'
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
