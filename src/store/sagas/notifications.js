import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import * as notificationActionTypes from '_src/constants/action/notification'
import * as notificationsConstants from '_src/constants/notifications'

export function * addNotification (action) {
  const id = _.uniqueId('notification_')

  yield put.resolve({
    type: notificationActionTypes.NOTIFICATION_ADDED,
    payload: Object.assign({ id }, action.payload)
  })

  const delayMs =
    (action.payload.timeoutSecs ||
      notificationsConstants.DEFAULT_NOTIFICATION_DISPLAY_TIME_SECS) * 1000

  yield call(delay, delayMs)

  yield put.resolve({
    type: notificationActionTypes.REMOVE_NOTIFICATION,
    payload: { id }
  })
}

export default [
  takeEvery(notificationActionTypes.ADD_NOTIFICATION, addNotification)
]
