import { put, take, fork, call } from 'redux-saga/effects'

import * as referenceActions from '../actions'
import * as fetchLib from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'

export function * fetchReferenceData () {
  yield take(referenceActions.types.FETCH_REFERENCE_DATA)
  const url = process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'
  const json = yield call(sagaLib.callWithInfiniteRetry, fetchLib.get, url)
  yield put(referenceActions.fetchReferenceDataSucceeded(json))
}

export default [fork(fetchReferenceData)]
