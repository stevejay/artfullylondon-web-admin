import { put, call, takeLatest } from 'redux-saga/effects'
import log from 'loglevel'

import * as statusActions from '_src/store/actions/status'
import * as fetchLib from '_src/lib/fetch'

export function * getEntityCounts () {
  try {
    yield put(statusActions.getEntityCountsStarted())

    const json = yield call(
      fetchLib.get,
      `${process.env.WEBSITE_API_HOST_URL}/search-service/admin/search/preset/entity-counts`
    )

    yield put(statusActions.getEntityCountsSucceeded(json))
  } catch (err) {
    yield call(log.error, err)
    yield put(statusActions.getEntityCountsFailed())
  }
}

export default [
  takeLatest(statusActions.types.GET_ENTITY_COUNTS, getEntityCounts)
]
