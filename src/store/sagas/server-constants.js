import { put, take, fork, call } from 'redux-saga/effects'
import * as types from '_src/constants/server-constants'
import { get } from '_src/lib/fetch'
import { callWithInfiniteRetry } from '_src/lib/saga'

export function * fetchServerConstants () {
  yield take(types.FETCH_SERVER_CONSTANTS)

  const url =
    process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'

  const json = yield call(callWithInfiniteRetry, get, url)

  yield put.resolve({
    type: types.FETCH_SERVER_CONSTANTS_SUCCEEDED,
    payload: json
  })
}

export default [fork(fetchServerConstants)]
