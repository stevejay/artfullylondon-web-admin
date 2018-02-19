import React from 'react'

import EntityAddress from './address'
import { FullVenue } from '_src/domain/venue'

it('should render correctly', () => {
  const venue = new FullVenue()
  venue.createFullAddress = jest.fn().mockReturnValue('26 Foo Street, Bar')

  const wrapper = shallow(<EntityAddress venue={venue} />)

  expect(wrapper).toMatchSnapshot()
})
