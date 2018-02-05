import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import * as notificationActions from '_src/modules/notification/actions'
import * as notificationConstants from '_src/modules/notification/constants'

export function * addNotification (action) {
  const id = _.uniqueId('notification_')
  yield put(notificationActions.notificationAdded({ ...action.payload, id }))
  yield call(delay, notificationConstants.DEFAULT_NOTIFICATION_DISPLAY_TIME_MS)
  yield put(notificationActions.removeNotification(id))
}

export default [
  takeEvery(notificationActions.types.ADD_NOTIFICATION, addNotification)
]
