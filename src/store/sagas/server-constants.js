import { put, take, fork, call } from 'redux-saga/effects'

import * as serverConstantsActionTypes
  from '_src/constants/action/server-constants'
import * as fetchLib from '_src/lib/fetch'
import * as sagaLib from '_src/lib/saga'

export function * fetchServerConstants () {
  yield take(serverConstantsActionTypes.FETCH_SERVER_CONSTANTS)

  const url = process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'

  const json = yield call(sagaLib.callWithInfiniteRetry, fetchLib.get, url)

  yield put({
    type: serverConstantsActionTypes.FETCH_SERVER_CONSTANTS_SUCCEEDED,
    payload: json
  })
}

export default [fork(fetchServerConstants)]
