import { cloneableGenerator } from 'redux-saga/utils'
import { call, put } from 'redux-saga/effects'
import { startSubmit, stopSubmit } from 'redux-form'
import log from 'loglevel'

import * as sagas from './index'
import * as sagaLib from '_src/lib/saga'
import * as monitorActions from '../actions'
import * as monitorConstants from '../constants'
import * as validationLib from '_src/lib/validation'
import { monitorService } from '_src/modules/api'

describe('getVenueEventMonitors', () => {
  const generator = cloneableGenerator(sagas.getVenueEventMonitors)(
    monitorActions.getVenueEventMonitors('venue-id')
  )

  it('should prepare to get venue event monitors', () => {
    let result = generator.next()
    expect(result.value).toEqual(
      put(monitorActions.getVenueEventMonitorsStarted())
    )

    result = generator.next()
    expect(result.value).toEqual(
      call(monitorService.getVenueEventMonitors, 'venue-id')
    )
  })

  it('should successfully get the event monitors', () => {
    const generatorClone = generator.clone()
    const items = [{ externalEventId: 'some-id', key: 'some-id' }]

    let result = generatorClone.next(items)
    expect(result.value).toEqual(
      put(monitorActions.getVenueEventMonitorsSucceeded(items))
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
      put(monitorActions.getVenueEventMonitorsFailed())
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('getVenueMonitors', () => {
  const generator = cloneableGenerator(sagas.getVenueMonitors)(
    monitorActions.getVenueMonitors('venue-id')
  )

  it('should prepare to get venue monitor', () => {
    let result = generator.next()
    expect(result.value).toEqual(put(monitorActions.getVenueMonitorsStarted()))

    result = generator.next()
    expect(result.value).toEqual(
      call(monitorService.getVenueMonitors, 'venue-id')
    )
  })

  it('should successfully get the venue monitor', () => {
    const generatorClone = generator.clone()
    const items = [{ venueId: 'some-id', key: 'some-id' }]

    let result = generatorClone.next(items)
    expect(result.value).toEqual(
      put(monitorActions.getVenueMonitorsSucceeded(items))
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
    expect(result.value).toEqual(put(monitorActions.getVenueMonitorsFailed()))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })

  it('should handle a 404 exception being thrown', () => {
    const generatorClone = generator.clone()
    const error = new Error('deliberately thrown')
    error.statusCode = 404

    let result = generatorClone.throw(error)
    expect(result.value).toEqual(put(monitorActions.getVenueMonitorsFailed()))

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('updateVenueMonitor', () => {
  const generator = cloneableGenerator(sagas.updateVenueMonitor)({
    type: monitorActions.types.UPDATE_VENUE_MONITOR,
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
      put(startSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
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
        monitorConstants.MONITOR_CONSTRAINT
      )
    )
  })

  it('should successfully update the monitor', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(monitorService.updateVenueMonitor, {
        venueId: 'some-id',
        hasChanged: false,
        isIgnored: true
      })
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(
        monitorActions.updateVenueMonitorSucceeded({
          venueId: 'some-id',
          hasChanged: false,
          isIgnored: true
        })
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
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
        monitorConstants.UPDATE_MONITOR_FORM_NAME
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})

describe('updateVenueEventMonitor', () => {
  const generator = cloneableGenerator(sagas.updateVenueEventMonitor)({
    type: monitorActions.types.UPDATE_VENUE_EVENT_MONITOR,
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
      put(startSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
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
        monitorConstants.MONITOR_CONSTRAINT
      )
    )
  })

  it('should successfully update the monitor', () => {
    const generatorClone = generator.clone()

    let result = generatorClone.next()
    expect(result.value).toEqual(
      call(monitorService.updateVenueEventMonitor, {
        venueId: 'some-id',
        externalEventId: 'some-external-id',
        hasChanged: false,
        isIgnored: true
      })
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(
        monitorActions.updateVenueEventMonitorSucceeded({
          venueId: 'some-id',
          externalEventId: 'some-external-id',
          hasChanged: false,
          isIgnored: true
        })
      )
    )

    result = generatorClone.next()
    expect(result.value).toEqual(
      put(stopSubmit(monitorConstants.UPDATE_MONITOR_FORM_NAME))
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
        monitorConstants.UPDATE_MONITOR_FORM_NAME
      )
    )

    result = generatorClone.next()
    expect(result.done).toEqual(true)
  })
})
