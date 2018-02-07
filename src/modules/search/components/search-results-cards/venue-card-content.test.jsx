import React from 'react'
import { shallow } from 'enzyme'

import { SummaryVenue } from '_src/entities/venue'
import VenueCardContent
  from '_src/modules/search/components/search-results-cards/venue-card-content'

it('should render correctly', () => {
  const entity = new SummaryVenue({
    id: 'some-id',
    name: 'Some Name',
    venueType: 'Theatre'
  })

  entity.createFullAddress = jest.fn().mockReturnValue('The Full Address')

  const wrapper = shallow(<VenueCardContent entity={entity} />)

  expect(wrapper).toMatchSnapshot()
})
