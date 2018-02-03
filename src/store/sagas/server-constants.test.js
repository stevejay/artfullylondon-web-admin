import { take, call, put } from 'redux-saga/effects'

import { serverConstantActions } from '_src/store'
import * as serverConstantSagas from '_src/store/sagas/server-constant'
import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'

describe('fetchServerConstants', () => {
  it('should fetch the server constants', () => {
    const generator = serverConstantSagas.fetchServerConstants()

    let result = generator.next()

    expect(result.value).toEqual(
      take(serverConstantActions.types.FETCH_SERVER_CONSTANTS)
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
      put(serverConstantActions.fetchServerConstantsSucceeded('some json'))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
