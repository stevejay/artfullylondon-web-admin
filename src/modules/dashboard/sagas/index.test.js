import { call, put } from 'redux-saga/effects'
import log from 'loglevel'

import * as dashboardSagas from './index'
import * as dashboardActions from '../actions'
import { searchService } from '_src/modules/api'

describe('getEntityCounts', () => {
  it('should get the entity counts', () => {
    const generator = dashboardSagas.getEntityCounts()

    let result = generator.next()
    expect(result.value).toEqual(put(dashboardActions.getEntityCountsStarted()))

    result = generator.next()
    expect(result.value).toEqual(call(searchService.getEntityCounts))

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
    expect(result.value).toEqual(call(searchService.getEntityCounts))

    result = generator.throw(error)
    expect(result.value).toEqual(call(log.error, error))

    result = generator.next()
    expect(result.value).toEqual(put(dashboardActions.getEntityCountsFailed()))

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
