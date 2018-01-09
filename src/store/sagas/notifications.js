import { delay } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
import _ from 'lodash'

import * as types from '_src/constants/notifications'

const NOTIFICATION_DISPLAY_TIME_SECS = 5

export function * addNotification (action) {
  const id = _.uniqueId('notification_')

  yield put.resolve({
    type: types.NOTIFICATION_ADDED,
    payload: Object.assign({ id }, action.payload)
  })

  const delayMs =
    (action.payload.timeoutSecs || NOTIFICATION_DISPLAY_TIME_SECS) * 1000

  yield call(delay, delayMs)

  yield put.resolve({
    type: types.REMOVE_NOTIFICATION,
    payload: { id }
  })
}

export default [takeEvery(types.ADD_NOTIFICATION, addNotification)]
