import React from 'react'

import { SummaryEvent } from '_src/entities/event'
import EventCardContent
  from '_src/modules/search/components/search-results-cards/event-card-content'

it('should render correctly', () => {
  const entity = new SummaryEvent({
    id: 'some-id',
    name: 'Some Name',
    venueName: 'Some Venue Name',
    postcode: 'N8 2WW',
    summary: 'The Summary'
  })

  const wrapper = shallow(
    <EventCardContent entity={entity} dateStr='2017/01/18' />
  )

  expect(wrapper).toMatchSnapshot()
})
