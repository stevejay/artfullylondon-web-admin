import { call } from 'redux-saga/effects'

import * as sagas from './monitor-service'
import * as fetchLib from '_src/shared/lib/fetch'
import { getAuthTokenForCurrentUser } from '_src/modules/user'

describe('getVenueEventMonitors', () => {
  it('should get', () => {
    const generator = sagas.getVenueEventMonitors('venue-id')

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/monitor-service/monitor/venue/venue-id/event/',
        'some-token'
      )
    )

    result = generator.next({
      items: [{ externalEventId: 'some-external-id' }]
    })
    expect(result.value).toEqual([
      { key: 'some-external-id', externalEventId: 'some-external-id' }
    ])

    expect(result.done).toEqual(true)
  })
})

describe('updateVenueEventMonitor', () => {
  it('should update', () => {
    const generator = sagas.updateVenueEventMonitor({
      venueId: 'venue-id',
      externalEventId: 'some external id',
      hasChanged: true,
      isIgnored: false
    })

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.put,
        'https://api.test.com/monitor-service/monitor/venue/venue-id/event/some%20external%20id',
        {
          hasChanged: true,
          isIgnored: false
        },
        'some-token'
      )
    )

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})

describe('getVenueMonitors', () => {
  it('should get', () => {
    const generator = sagas.getVenueMonitors('venue-id')

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.get,
        'https://api.test.com/monitor-service/monitor/venue/venue-id',
        'some-token'
      )
    )

    result = generator.next({
      items: [{ venueId: 'some-venue-id' }]
    })
    expect(result.value).toEqual([
      { key: 'some-venue-id', venueId: 'some-venue-id' }
    ])

    expect(result.done).toEqual(true)
  })
})

describe('updateVenueMonitor', () => {
  it('should update', () => {
    const generator = sagas.updateVenueMonitor({
      venueId: 'venue-id',
      hasChanged: true,
      isIgnored: false
    })

    let result = generator.next()
    expect(result.value).toEqual(call(getAuthTokenForCurrentUser))

    result = generator.next('some-token')
    expect(result.value).toEqual(
      call(
        fetchLib.put,
        'https://api.test.com/monitor-service/monitor/venue/venue-id',
        {
          hasChanged: true,
          isIgnored: false
        },
        'some-token'
      )
    )

    result = generator.next()
    expect(result.done).toEqual(true)
  })
})
