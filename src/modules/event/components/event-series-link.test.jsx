import React from 'react'

import EventSeriesLink from './event-series-link'
import { SummaryEventSeries } from '_src/entities/event-series'
import eventSeriesType from '_src/entities/event-series-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <EventSeriesLink
      eventSeries={
        new SummaryEventSeries({
          id: 'some-id',
          name: 'Some Name',
          eventSeriesType: eventSeriesType.SEASON
        })
      }
    />
  )

  expect(wrapper).toMatchSnapshot()
})
