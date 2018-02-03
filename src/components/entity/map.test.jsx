import React from 'react'
import { shallow } from 'enzyme'
import window from 'global/window'

import EntityMap from '_src/components/entity/map'
import StaticGoogleMap from '_src/components/google-map/static'
import * as locationLib from '_src/lib/location'

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

it('should not update', () => {
  const wrapper = shallow(<EntityMap zoom={14} pin={{ lat: 2, lng: 4 }} />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})

it('should handle a pin click', () => {
  window.open = jest.fn()

  locationLib.createGoogleMapLinkUrl = jest
    .fn()
    .mockReturnValue('https://some-url')

  const wrapper = shallow(
    <EntityMap
      zoom={14}
      pin={{ lat: 2, lng: 4 }}
      userLocation={{ lat: 6, lng: 8 }}
    />
  )

  wrapper.find(StaticGoogleMap).prop('onPinClick')()

  expect(locationLib.createGoogleMapLinkUrl).toHaveBeenCalledWith(2, 4, 16)
  expect(window.open).toHaveBeenCalledWith('https://some-url', '_blank')
})
