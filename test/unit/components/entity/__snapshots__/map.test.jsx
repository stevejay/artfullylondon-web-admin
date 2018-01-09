import React from 'react'
import { shallow } from 'enzyme'

import EntityMap from '_admin/components/entity/map'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityMap
      zoom={14}
      pin={{ lat: 2, lng: 4 }}
      userLocation={{ lat: 6, lng: 8 }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no user location', () => {
  const wrapper = shallow(<EntityMap zoom={14} pin={{ lat: 2, lng: 4 }} />)
  expect(wrapper).toMatchSnapshot()
})
