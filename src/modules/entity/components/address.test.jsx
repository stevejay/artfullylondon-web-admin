import React from 'react'

import EntityAddress from './address'
import { SummaryVenue } from '_src/entities/venue'

it('should render correctly', () => {
  const venue = new SummaryVenue()
  venue.createFullAddress = jest.fn().mockReturnValue('26 Foo Street, Bar')

  const wrapper = shallow(<EntityAddress venue={venue} />)

  expect(wrapper).toMatchSnapshot()
})
