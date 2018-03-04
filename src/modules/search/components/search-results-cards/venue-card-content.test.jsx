import React from 'react'

import { SummaryVenue } from '_src/domain/venue'
import VenueCardContent from './venue-card-content'

it('should render correctly', () => {
  const entity = new SummaryVenue({
    id: 'some-id',
    name: 'Some Name',
    venueType: venueType.THEATRE
  })

  entity.createFullAddress = jest.fn().mockReturnValue('The Full Address')

  const wrapper = shallow(<VenueCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
