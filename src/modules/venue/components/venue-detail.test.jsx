import React from 'react'
import _ from 'lodash'

import { VenueDetail } from './venue-detail'
import { FullVenue } from '_src/entities/venue'
import {
  MonitorCollection,
  actions as monitorActions
} from '_src/modules/monitor'
import * as dateLib from '_src/lib/date'

it('should render correctly', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const entity = new FullVenue({
    name: 'The Name',
    images: [],
    latitude: 1,
    longitude: 2
  })

  const wrapper = shallow(
    <VenueDetail
      entity={entity}
      venueMonitors={null}
      venueEventMonitors={null}
      gettingVenueMonitors={false}
      gettingVenueEventMonitors={false}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle lazy load of the venue monitor', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const dispatch = jest.fn()

  const wrapper = shallow(
    <VenueDetail
      entity={
        new FullVenue({
          id: 'some-id',
          name: 'The Name',
          images: [],
          latitude: 1,
          longitude: 2
        })
      }
      venueMonitors={null}
      venueEventMonitors={null}
      gettingVenueMonitors={false}
      gettingVenueEventMonitors={false}
      dispatch={dispatch}
    />
  )

  wrapper.find(MonitorCollection).at(0).prop('onMounted')()

  expect(dispatch).toHaveBeenCalledWith(
    monitorActions.getVenueMonitors('some-id')
  )
})

it('should handle lazy load of the venue event monitors', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const dispatch = jest.fn()

  const wrapper = shallow(
    <VenueDetail
      entity={
        new FullVenue({
          id: 'some-id',
          name: 'The Name',
          images: [],
          latitude: 1,
          longitude: 2
        })
      }
      venueMonitors={null}
      venueEventMonitors={null}
      gettingVenueMonitors={false}
      gettingVenueEventMonitors={false}
      dispatch={dispatch}
    />
  )

  wrapper.find(MonitorCollection).at(1).prop('onMounted')()

  expect(dispatch).toHaveBeenCalledWith(
    monitorActions.getVenueEventMonitors('some-id')
  )
})

it('should handle submitting a venue monitor', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const dispatch = jest.fn()

  const wrapper = shallow(
    <VenueDetail
      entity={
        new FullVenue({
          id: 'some-id',
          name: 'The Name',
          images: [],
          latitude: 1,
          longitude: 2
        })
      }
      venueMonitors={null}
      venueEventMonitors={null}
      gettingVenueMonitors={false}
      gettingVenueEventMonitors={false}
      dispatch={dispatch}
    />
  )

  wrapper.find(MonitorCollection).at(0).prop('onSubmit')({ ignore: true })

  expect(dispatch).toHaveBeenCalledWith(
    monitorActions.updateVenueMonitor({ ignore: true })
  )
})

it('should handle submitting a venue event monitor', () => {
  dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

  const dispatch = jest.fn()

  const wrapper = shallow(
    <VenueDetail
      entity={
        new FullVenue({
          id: 'some-id',
          name: 'The Name',
          images: [],
          latitude: 1,
          longitude: 2
        })
      }
      venueMonitors={null}
      venueEventMonitors={null}
      gettingVenueMonitors={false}
      gettingVenueEventMonitors={false}
      dispatch={dispatch}
    />
  )

  wrapper.find(MonitorCollection).at(1).prop('onSubmit')({ ignore: true })

  expect(dispatch).toHaveBeenCalledWith(
    monitorActions.updateVenueEventMonitor({ ignore: true })
  )
})
