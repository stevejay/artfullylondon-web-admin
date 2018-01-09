import React from 'react'
import { shallow } from 'enzyme'

import { SummaryEventSeries } from '_src/entities/event-series'
import EventSeriesCardContent
  from '_src/components/search-results-cards/event-series-card-content'

it('should render correctly', () => {
  const entity = new SummaryEventSeries({
    id: 'some-id',
    name: 'Some Name'
  })

  const wrapper = shallow(<EventSeriesCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
