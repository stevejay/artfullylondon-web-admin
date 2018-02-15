import React from 'react'

import { SummaryEventSeries } from '_src/entities/event-series'
import EventSeriesCardContent
  from '_src/modules/search/components/search-results-cards/event-series-card-content'

it('should render correctly', () => {
  const entity = new SummaryEventSeries({
    id: 'some-id',
    name: 'Some Name'
  })

  const wrapper = shallow(<EventSeriesCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
