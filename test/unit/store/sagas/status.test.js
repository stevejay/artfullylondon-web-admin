import { call, put } from 'redux-saga/effects'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import * as statusActionTypes from '_src/constants/action/status'
import * as statusSagas from '_src/store/sagas/status'

describe('getEntityCounts', () => {
  it('should get the entity counts', () => {
    const generator = statusSagas.getEntityCounts()

    let result = generator.next()

    expect(result.value).toEqual(
      put({ type: statusActionTypes.GET_ENTITY_COUNTS_STARTED })
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        fetchLib.get,
        process.env.WEBSITE_API_HOST_URL +
          '/search-service/admin/search/preset/entity-counts'
      )
    )

    result = generator.next('some json')

    expect(result.value).toEqual(
      put({
        type: statusActionTypes.GET_ENTITY_COUNTS_SUCCEEDED,
        payload: 'some json'
      })
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error when getting the error counts', () => {
    const generator = statusSagas.getEntityCounts()
    const error = new Error('deliberately thrown')

    let result = generator.next()

    expect(result.value).toEqual(
      put({ type: statusActionTypes.GET_ENTITY_COUNTS_STARTED })
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        fetchLib.get,
        process.env.WEBSITE_API_HOST_URL +
          '/search-service/admin/search/preset/entity-counts'
      )
    )

    result = generator.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()

    expect(result.value).toEqual(
      put({ type: statusActionTypes.GET_ENTITY_COUNTS_FAILED })
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
