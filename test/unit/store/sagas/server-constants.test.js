import { take, call, put } from 'redux-saga/effects'

import * as serverConstantsActions from '_src/store/actions/server-constants'
import * as serverConstantsSagas from '_src/store/sagas/server-constants'
import * as sagaLib from '_src/lib/saga'
import * as fetchLib from '_src/lib/fetch'

describe('fetchServerConstants', () => {
  it('should fetch the server constants', () => {
    const generator = serverConstantsSagas.fetchServerConstants()

    let result = generator.next()

    expect(result.value).toEqual(
      take(serverConstantsActions.types.FETCH_SERVER_CONSTANTS)
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
      put(serverConstantsActions.fetchServerConstantsSucceeded('some json'))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
