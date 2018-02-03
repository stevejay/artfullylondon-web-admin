import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { GoogleMap } from '_src/components/google-map'

it('should render correctly', () => {
  const wrapper = shallow(
    <GoogleMap
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible
      selectedMarkerId='pin-id'
      userLocation={{ lat: 1, lng: 3 }}
      iconUrlFactory={() => <div />}
      onCenterChanged={_.noop}
      onZoomChanged={_.noop}
      onMarkerClick={_.noop}
      onMounted={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no user location', () => {
  const wrapper = shallow(
    <GoogleMap
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible
      selectedMarkerId='pin-id'
      iconUrlFactory={() => <div />}
      onCenterChanged={_.noop}
      onZoomChanged={_.noop}
      onMarkerClick={_.noop}
      onMounted={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
