import React from 'react'
import { shallow } from 'enzyme'

import EventSeriesLink from '_admin/components/event/event-series-link'
import { SummaryEventSeries } from '_admin/entities/event-series'
import { EVENT_SERIES_TYPE_SEASON } from '_admin/constants/event-series'

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
