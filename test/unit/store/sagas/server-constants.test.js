import { take, call, put } from 'redux-saga/effects'

import { callWithInfiniteRetry } from '_src/lib/saga'
import { get } from '_src/lib/fetch'
import * as types from '_src/constants/server-constants'
import * as serverConstantsSagas from '_src/store/sagas/server-constants'

describe('fetchServerConstants', () => {
  const generator = serverConstantsSagas.fetchServerConstants()

  it('waits for the start action', () => {
    expect(generator.next().value).toEqual(take(types.FETCH_SERVER_CONSTANTS))
  })

  it('fetches the data', () => {
    expect(generator.next('foo').value).toEqual(
      call(
        callWithInfiniteRetry,
        get,
        process.env.WEBSITE_API_HOST_URL + '/data-service/admin-site-data'
      )
    )
  })

  it('sends the data to the store', () => {
    expect(generator.next('some json').value).toEqual(
      put.resolve({
        type: types.FETCH_SERVER_CONSTANTS_SUCCEEDED,
        payload: 'some json'
      })
    )
  })

  it('should be done', () => {
    expect(generator.next().done).toEqual(true)
  })
})
