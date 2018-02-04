import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Map from '_src/components/map'

it('should render correctly', () => {
  const wrapper = shallow(
    <Map
      value={{ lat: 11, lng: 22 }}
      defaultCenter={{ lat: 33, lng: 44 }}
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const value = { lat: 11, lng: 22 }

    const wrapper = shallow(
      <Map
        value={value}
        defaultCenter={{ lat: 33, lng: 44 }}
        disabled
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      value,
      disabled: true
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const value = { lat: 11, lng: 22 }

    const wrapper = shallow(
      <Map
        value={value}
        defaultCenter={{ lat: 33, lng: 44 }}
        disabled
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      value,
      disabled: false
    })

    expect(result).toEqual(true)
  })
})

it('should handle a click on the map', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <Map
      value={{ lat: 11, lng: 22 }}
      defaultCenter={{ lat: 33, lng: 44 }}
      onChange={handleChange}
    />
  )

  wrapper.find('withScriptjs(withGoogleMap(Component))').simulate('click', {
    latLng: { lat: () => 55, lng: () => 66 }
  })

  expect(handleChange).toHaveBeenCalledWith({ lat: 55, lng: 66 })
})
