import { put, call, takeLatest } from 'redux-saga/effects'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import * as dashboardActions from '_src/modules/dashboard/actions'

export function * getEntityCounts () {
  try {
    yield put(dashboardActions.getEntityCountsStarted())

    const json = yield call(
      fetchLib.get,
      `${process.env.WEBSITE_API_HOST_URL}/search-service/admin/search/preset/entity-counts`
    )

    yield put(dashboardActions.getEntityCountsSucceeded(json))
  } catch (err) {
    yield call(log.error, err)
    yield put(dashboardActions.getEntityCountsFailed())
  }
}

export default [
  takeLatest(dashboardActions.types.GET_ENTITY_COUNTS, getEntityCounts)
]
