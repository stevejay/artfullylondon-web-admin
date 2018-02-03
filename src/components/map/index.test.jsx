import React from 'react'
import { shallow } from 'enzyme'

import Map from '_src/components/map'

it('should render correctly', () => {
  const wrapper = shallow(
    <Map
      value={{
        lat: 11,
        lng: 22
      }}
      defaultCenter={{
        lat: 33,
        lng: 44
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
