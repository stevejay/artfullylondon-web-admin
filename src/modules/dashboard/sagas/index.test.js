import { call, put } from 'redux-saga/effects'
import log from 'loglevel'

import * as fetchLib from '_src/lib/fetch'
import * as dashboardActions from '_src/modules/dashboard/actions'
import * as dashboardSagas from '_src/modules/dashboard/sagas'

describe('getEntityCounts', () => {
  it('should get the entity counts', () => {
    const generator = dashboardSagas.getEntityCounts()

    let result = generator.next()

    expect(result.value).toEqual(put(dashboardActions.getEntityCountsStarted()))

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
      put(dashboardActions.getEntityCountsSucceeded('some json'))
    )

    result = generator.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an error when getting the error counts', () => {
    const generator = dashboardSagas.getEntityCounts()
    const error = new Error('deliberately thrown')

    let result = generator.next()

    expect(result.value).toEqual(put(dashboardActions.getEntityCountsStarted()))

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

    expect(result.value).toEqual(put(dashboardActions.getEntityCountsFailed()))

    result = generator.next()

    expect(result.done).toEqual(true)
  })
})
