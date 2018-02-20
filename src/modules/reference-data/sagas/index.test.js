import { take, call, put } from 'redux-saga/effects'

import * as referenceActions from '../actions'
import * as sagas from './index'
import * as sagaLib from '_src/shared/lib/saga'
import * as fetchLib from '_src/shared/lib/fetch'

describe('fetchReferenceData', () => {
  it('should fetch the server constants', () => {
    const generator = sagas.fetchReferenceData()

    let result = generator.next()

    expect(result.value).toEqual(
      take(referenceActions.types.FETCH_REFERENCE_DATA)
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
      put(referenceActions.fetchReferenceDataSucceeded('some json'))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
