import React from 'react'
import { shallow } from 'enzyme'

import EventSeriesLink from '_src/components/event/event-series-link'
import { SummaryEventSeries } from '_src/entities/event-series'
import { EVENT_SERIES_TYPE_SEASON } from '_src/constants/event-series'

it('should render correctly', () => {
  const wrapper = shallow(
    <EventSeriesLink
      eventSeries={
        new SummaryEventSeries({
          id: 'some-id',
          name: 'Some Name',
          eventSeriesType: EVENT_SERIES_TYPE_SEASON
        })
      }
    />
  )

  expect(wrapper).toMatchSnapshot()
})
