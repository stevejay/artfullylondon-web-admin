import React from 'react'

import { SummaryEventSeries } from '_src/domain/event-series'
import EventSeriesCardContent from './event-series-card-content'

it('should render correctly', () => {
  const entity = new SummaryEventSeries({
    id: 'some-id',
    name: 'Some Name'
  })

  const wrapper = shallow(<EventSeriesCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
