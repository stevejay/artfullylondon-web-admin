import React from 'react'
import window from 'global/window'

import EntityPageMap from './entity-page-map'
import GoogleMapStatic from './google-map-static'
import * as locationLib from '../lib/location'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityPageMap
      zoom={14}
      pin={{ lat: 2, lng: 4 }}
      userLocation={{ lat: 6, lng: 8 }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no user location', () => {
  const wrapper = shallow(<EntityPageMap zoom={14} pin={{ lat: 2, lng: 4 }} />)
  expect(wrapper).toMatchSnapshot()
})

it('should handle a pin click', () => {
  window.open = jest.fn()

  locationLib.createGoogleMapLinkUrl = jest
    .fn()
    .mockReturnValue('https://some-url')

  const wrapper = shallow(
    <EntityPageMap
      zoom={14}
      pin={{ lat: 2, lng: 4 }}
      userLocation={{ lat: 6, lng: 8 }}
    />
  )

  wrapper.find(GoogleMapStatic).prop('onPinClick')()

  expect(locationLib.createGoogleMapLinkUrl).toHaveBeenCalledWith(2, 4, 16)
  expect(window.open).toHaveBeenCalledWith('https://some-url', '_blank')
})
