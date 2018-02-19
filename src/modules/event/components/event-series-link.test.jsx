import React from 'react'

import EventSeriesLink from './event-series-link'
import { SummaryEventSeries } from '_src/domain/event-series'
import eventSeriesType from '_src/domain/types/event-series-type'

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
