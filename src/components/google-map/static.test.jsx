import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { StaticGoogleMap } from '_src/components/google-map/static'

it('should render correctly', () => {
  const wrapper = shallow(
    <StaticGoogleMap
      zoom={14}
      pin={{ lat: 2, lng: 6 }}
      userLocation={{ lat: 3, lng: 8 }}
      onPinClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with no user location', () => {
  const wrapper = shallow(
    <StaticGoogleMap zoom={14} pin={{ lat: 2, lng: 6 }} onPinClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
