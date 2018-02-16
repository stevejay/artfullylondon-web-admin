import { cloneableGenerator } from 'redux-saga/utils'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as sagas from './index'
import * as sagaLib from '_src/lib/saga'
import * as venueActions from '../actions'
import { getAuthTokenForCurrentUser } from '_src/modules/user'
import { get, put as httpPut } from '_src/lib/fetch'
import * as venueConstants from '../constants'
import * as validationLib from '_src/lib/validation'

describe('getVenueEventMonitors', () => {
  const generator = cloneableGenerator(sagas.getVenueEventMonitors)(
    venueActions.getVenueEventMonitors('venue-id')
  )

  it('should prepare to get venue event monitors', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put(venueActions.getVenueEventMonitorsStarted())
    )

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        get,
        'https://api.test.com/monitor-service/monitor/venue/venue-id/event/',
        'some-token'
      )
    )
  })

  it('should successfully get the event monitors', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
      items: [{ externalEventId: 'some-id' }]
    })

    expect(result.value).toEqual(
      put(
        venueActions.getVenueEventMonitorsSucceeded([
          { externalEventId: 'some-id', key: 'some-id' }
        ])
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an exception being thrown', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(venueActions.getVenueEventMonitorsFailed())
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('getVenueMonitor', () => {
  const generator = cloneableGenerator(sagas.getVenueMonitor)(
    venueActions.getVenueMonitor('venue-id')
  )

  it('should prepare to get venue monitor', () => {
    let result = generator.next()

    expect(result.value).toEqual(put(venueActions.getVenueMonitorStarted()))

    result = generator.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')

    expect(result.value).toEqual(
      call(
        get,
        'https://api.test.com/monitor-service/monitor/venue/venue-id',
        'some-token'
      )
    )
  })

  it('should successfully get the venue monitor', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next({
      entity: { venueId: 'some-id' }
    })

    expect(result.value).toEqual(
      put(
        venueActions.getVenueMonitorSucceeded({
          venueId: 'some-id',
          key: 'some-id'
        })
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle an exception being thrown', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(put(venueActions.getVenueMonitorFailed()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a 404 exception being thrown', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')
    error.statusCode = 404

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(put(venueActions.getVenueMonitorFailed()))

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('updateVenueMonitor', () => {
  const generator = cloneableGenerator(sagas.updateVenueMonitor)({
    type: venueActions.types.UPDATE_VENUE_MONITOR,
    payload: {
      values: {
        venueId: 'some-id',
        hasChanged: false,
        isIgnored: true
      }
    },
    meta: { id: 12345 }
  })

  it('should prepare to update the monitor', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        {
          venueId: 'some-id',
          hasChanged: false,
          isIgnored: true
        },
        venueConstants.MONITOR_CONSTRAINT
      )
    )
  })

  it('should successfully update the monitor', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generatorClone.next('some-token')

    expect(result.value).toEqual(
      call(
        httpPut,
        'https://api.test.com/monitor-service/monitor/venue/some-id',
        {
          hasChanged: false,
          isIgnored: true
        },
        'some-token'
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(
        venueActions.updateVenueMonitorSucceeded({
          venueId: 'some-id',
          hasChanged: false,
          isIgnored: true
        })
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(stopSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(sagaLib.returnAsPromise(null, { id: 12345 }))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a validation fail', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        venueConstants.UPDATE_MONITOR_FORM_NAME
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})

describe('updateVenueEventMonitor', () => {
  const generator = cloneableGenerator(sagas.updateVenueEventMonitor)({
    type: venueActions.types.UPDATE_VENUE_EVENT_MONITOR,
    payload: {
      values: {
        venueId: 'some-id',
        externalEventId: 'some-external-id',
        hasChanged: false,
        isIgnored: true
      }
    },
    meta: { id: 12345 }
  })

  it('should prepare to update the monitor', () => {
    let result = generator.next()

    expect(result.value).toEqual(
      put(startSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    )

    result = generator.next()

    expect(result.value).toEqual(
      call(
        validationLib.validate,
        {
          venueId: 'some-id',
          externalEventId: 'some-external-id',
          hasChanged: false,
          isIgnored: true
        },
        venueConstants.MONITOR_CONSTRAINT
      )
    )
  })

  it('should successfully update the monitor', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()

    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generatorClone.next('some-token')

    expect(result.value).toEqual(
      call(
        httpPut,
        'https://api.test.com/monitor-service/monitor/venue/some-id/event/some-external-id',
        {
          hasChanged: false,
          isIgnored: true
        },
        'some-token'
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(
        venueActions.updateVenueEventMonitorSucceeded({
          venueId: 'some-id',
          externalEventId: 'some-external-id',
          hasChanged: false,
          isIgnored: true
        })
      )
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(stopSubmit(venueConstants.UPDATE_MONITOR_FORM_NAME))
    )

    result = generatorClone.next()

    expect(result.value).toEqual(
      put(sagaLib.returnAsPromise(null, { id: 12345 }))
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })

  it('should handle a validation fail', () => {
    const generatorClone = generator.clone()

    const error = new Error('deliberately thrown')

    let result = generatorClone.throw(error)

    expect(result.value).toEqual(call(log.error, error))

    result = generatorClone.next()

    expect(result.value).toEqual(
      call(
        sagaLib.submitErrorHandler,
        error,
        venueConstants.UPDATE_MONITOR_FORM_NAME
      )
    )

    result = generatorClone.next()

    expect(result.done).toEqual(true)
  })
})
