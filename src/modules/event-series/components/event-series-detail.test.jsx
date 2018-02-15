import React from 'react'

import EventSeriesDetail from './event-series-detail'
import { FullEventSeries } from '_src/entities/event-series'

it('should render correctly', () => {
  const entity = new FullEventSeries({
    name: 'The Name',
    images: []
  })

  const wrapper = shallow(<EventSeriesDetail entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
