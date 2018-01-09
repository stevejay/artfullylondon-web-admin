import { call, put } from 'redux-saga/effects'
import { get } from '_src/lib/fetch'
import * as types from '_src/constants/status'
import * as statusSagas from '_src/store/sagas/status'

describe('getEntityCounts', () => {
  const generator = statusSagas.getEntityCounts()

  it('signals that it has started execution', () => {
    expect(generator.next(null).value).toEqual(
      put.resolve({ type: types.GET_ENTITY_COUNTS_STARTED })
    )
  })

  it('fetches the data', () => {
    expect(generator.next(null).value).toEqual(
      call(
        get,
        process.env.ARTFULLY_LONDON_API_URL +
          '/search-service/admin/search/preset/entity-counts'
      )
    )
  })

  it('sends the data to the store', () => {
    expect(generator.next('some json').value).toEqual(
      put.resolve({
        type: types.GET_ENTITY_COUNTS_SUCCEEDED,
        payload: 'some json'
      })
    )
  })

  it('should be done', () => {
    expect(generator.next().done).toEqual(true)
  })
})
