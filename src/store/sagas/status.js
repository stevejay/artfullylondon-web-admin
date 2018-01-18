import { put, call, takeLatest } from 'redux-saga/effects'
import log from 'loglevel'

import * as statusActionTypes from '_src/constants/action/status'
import { get } from '_src/lib/fetch'

export function * getEntityCounts () {
  try {
    yield put.resolve({ type: statusActionTypes.GET_ENTITY_COUNTS_STARTED })

    const url = `${process.env.WEBSITE_API_HOST_URL}/search-service/admin/search/preset/entity-counts`
    const json = yield call(get, url)

    yield put.resolve({
      type: statusActionTypes.GET_ENTITY_COUNTS_SUCCEEDED,
      payload: json
    })
  } catch (err) {
    log.error('getEntityCounts error', err)
    yield put.resolve({ type: statusActionTypes.GET_ENTITY_COUNTS_FAILED })
  }
}

export default [
  takeLatest(statusActionTypes.GET_ENTITY_COUNTS, getEntityCounts)
]
