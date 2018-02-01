import { put, take, fork, call } from 'redux-saga/effects'

import * as serverConstantsActions from '_src/store/actions/server-constants'
import * as fetchLib from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'

export function * fetchServerConstants () {
  yield take(serverConstantsActions.types.FETCH_SERVER_CONSTANTS)
  const url = process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'
  const json = yield call(sagaLib.callWithInfiniteRetry, fetchLib.get, url)
  yield put(serverConstantsActions.fetchServerConstantsSucceeded(json))
}

export default [fork(fetchServerConstants)]
