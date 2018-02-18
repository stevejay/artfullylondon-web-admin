import { put, call, takeLatest } from 'redux-saga/effects'
import log from 'loglevel'

import { searchService } from '_src/modules/api'
import * as dashboardActions from '../actions'

export function * getEntityCounts () {
  try {
    yield put(dashboardActions.getEntityCountsStarted())
    const json = yield call(searchService.getEntityCounts)
    yield put(dashboardActions.getEntityCountsSucceeded(json))
  } catch (err) {
    yield call(log.error, err)
    yield put(dashboardActions.getEntityCountsFailed())
  }
}

export default [
  takeLatest(dashboardActions.types.GET_ENTITY_COUNTS, getEntityCounts)
]
