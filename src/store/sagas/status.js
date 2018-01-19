import { put, call, takeLatest } from 'redux-saga/effects'
import log from 'loglevel'

import * as statusActionTypes from '_src/constants/action/status'
import * as fetchLib from '_src/lib/fetch'

export function * getEntityCounts () {
  try {
    yield put({ type: statusActionTypes.GET_ENTITY_COUNTS_STARTED })

    const json = yield call(
      fetchLib.get,
      `${process.env.WEBSITE_API_HOST_URL}/search-service/admin/search/preset/entity-counts`
    )

    yield put({
      type: statusActionTypes.GET_ENTITY_COUNTS_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    yield call(log.error, err)
    yield put({ type: statusActionTypes.GET_ENTITY_COUNTS_FAILED })
  }
}

export default [
  takeLatest(statusActionTypes.GET_ENTITY_COUNTS, getEntityCounts)
]
