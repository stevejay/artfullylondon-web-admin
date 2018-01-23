import { put, call, takeLatest, fork, apply } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import cmp from 'semver-compare'
import window from 'global/window'
import store from 'store2'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import * as appActionTypes from '_src/constants/action/app'
import * as appConstants from '_src/constants/app'
import * as notificationActionTypes from '_src/constants/action/notification'
import * as notificationsConstants from '_src/constants/notifications'

export function * checkForUpdate () {
  let json = null

  while (true) {
    try {
      json = yield call(fetchLib.get, '/version.json')
    } catch (err) {
      yield call(log.error, err)
    }

    if (json && cmp(json.version, process.env.WEBSITE_VERSION) > 0) {
      break
    }

    yield call(delay, appConstants.CHECK_FOR_UPDATE_POLL_MS)
  }

  yield put({
    type: appActionTypes.APP_SHOULD_UPDATE,
    payload: json
  })
}

export function * updateApp () {
  yield call(store.session, appConstants.UPDATED_APP_VERSION_KEY, true)
  yield apply(window.location, window.location.reload)
}

export function * checkIfAppWasUpdated () {
  const wasUpdated = yield apply(store.session, store.session.has, [
    appConstants.UPDATED_APP_VERSION_KEY
  ])

  if (wasUpdated) {
    yield apply(store.session, store.session.remove, [
      appConstants.UPDATED_APP_VERSION_KEY
    ])

    yield put({
      type: notificationActionTypes.ADD_NOTIFICATION,
      payload: {
        title: 'App Successfully Updated',
        message: `This app was updated to version ${process.env.WEBSITE_VERSION}.`,
        type: notificationsConstants.NOTIFICATION_TYPE_SUCCESS
      }
    })
  }
}

export default [
  fork(checkForUpdate),
  takeLatest(appActionTypes.UPDATE_APP, updateApp),
  takeLatest(appActionTypes.CHECK_IF_APP_WAS_UPDATED, checkIfAppWasUpdated)
]
