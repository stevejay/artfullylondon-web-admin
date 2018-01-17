import _ from 'lodash'
import { stopSubmit } from 'redux-form'
import { delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import Backoff from 'backo'
import log from 'loglevel'

export function * submitErrorHandler (err, formName) {
  if (!_.isNil(err.errors)) {
    yield put(stopSubmit(formName, err.errors))
  } else {
    yield put(stopSubmit(formName, { _error: err.message }))
  }
}

export function * callWithInfiniteRetry (func, ...args) {
  const backoff = new Backoff({ min: 3000, max: 30000 })

  while (true) {
    try {
      return yield call(func, ...args)
    } catch (err) {
      log.error('callWithInfiniteRetry error:' + err.message)
      yield delay(backoff.duration())
    }
  }
}
