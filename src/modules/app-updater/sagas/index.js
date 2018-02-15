import { put, call, takeLatest, apply } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import cmp from 'semver-compare'
import window from 'global/window'
import store from 'store2'
import log from 'loglevel'

import * as appUpdaterConstants from '../constants'
import * as appUpdaterActions from '../actions'
import * as fetchLib from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'
import { actions as notificationActions } from '_src/modules/notification'

export function * checkForNewAppVersion ({ meta }) {
  while (true) {
    let json = null

    try {
      json = yield call(fetchLib.get, '/version.json')
    } catch (err) {
      yield call(log.error, err)
    }

    if (json && cmp(json.version, process.env.WEBSITE_VERSION) > 0) {
      break
    }

    yield call(delay, appUpdaterConstants.CHECK_FOR_UPDATE_POLL_MS)
  }

  yield put(sagaLib.returnAsPromise(null, meta))
}

export function * updateApp () {
  yield call(store.session, appUpdaterConstants.UPDATED_APP_VERSION_KEY, true)
  yield apply(window.location, window.location.reload)
}

export function * checkIfAppWasUpdated () {
  const wasUpdated = yield apply(store.session, store.session.has, [
    appUpdaterConstants.UPDATED_APP_VERSION_KEY
  ])

  if (wasUpdated) {
    yield apply(store.session, store.session.remove, [
      appUpdaterConstants.UPDATED_APP_VERSION_KEY
    ])

    yield put(
      notificationActions.addSuccessNotification(
        'App Successfully Updated',
        `This app was updated to version ${process.env.WEBSITE_VERSION}.`
      )
    )
  }
}

export default [
  takeLatest(
    appUpdaterActions.types.CHECK_FOR_NEW_APP_VERSION,
    checkForNewAppVersion
  ),
  takeLatest(appUpdaterActions.types.UPDATE_APP, updateApp),
  takeLatest(
    appUpdaterActions.types.CHECK_IF_APP_WAS_UPDATED,
    checkIfAppWasUpdated
  )
]
