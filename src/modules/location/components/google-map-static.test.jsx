import React from 'react'
import _ from 'lodash'

import { GoogleMapStatic } from './google-map-static'

it('should render correctly', () => {
  const wrapper = shallow(
    <GoogleMapStatic
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
    <GoogleMapStatic zoom={14} pin={{ lat: 2, lng: 6 }} onPinClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
