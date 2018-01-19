import { take, call, put } from 'redux-saga/effects'

import * as serverConstantsActionTypes
  from '_src/constants/action/server-constants'
import * as serverConstantsSagas from '_src/store/sagas/server-constants'
import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'

describe('fetchServerConstants', () => {
  it('should fetch the server constants', () => {
    const generator = serverConstantsSagas.fetchServerConstants()

    let result = generator.next()

    expect(result.value).toEqual(
      take(serverConstantsActionTypes.FETCH_SERVER_CONSTANTS)
    )

    result = generator.next('foo')

    expect(result.value).toEqual(
      call(
        sagaLib.callWithInfiniteRetry,
        fetchLib.get,
        process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'
      )
    )

    result = generator.next('some json')

    expect(result.value).toEqual(
      put({
        type: serverConstantsActionTypes.FETCH_SERVER_CONSTANTS_SUCCEEDED,
        payload: 'some json'
      })
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
