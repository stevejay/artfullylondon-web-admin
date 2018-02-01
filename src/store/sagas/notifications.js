import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import * as notificationActions from '_src/store/actions/notification'
import * as notificationsConstants from '_src/constants/notifications'

export function * addNotification (action) {
  const id = _.uniqueId('notification_')
  yield put(notificationActions.notificationAdded(action.payload))
  yield call(delay, notificationsConstants.DEFAULT_NOTIFICATION_DISPLAY_TIME_MS)
  yield put(notificationActions.removeNotification(id))
}

export default [
  takeEvery(notificationActions.types.ADD_NOTIFICATION, addNotification)
]
