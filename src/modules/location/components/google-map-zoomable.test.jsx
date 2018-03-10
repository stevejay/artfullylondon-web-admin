import React from 'react'
import _ from 'lodash'
import { Marker, GoogleMap as ReactGoogleMap } from 'react-google-maps'
import window from 'global/window'

import { GoogleMapZoomable } from './google-map-zoomable'

it('should render correctly', () => {
  const wrapper = shallow(
    <GoogleMapZoomable
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
    <GoogleMapZoomable
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

it('should handle a marker click event', () => {
  const onMarkerClick = jest.fn()

  const wrapper = shallow(
    <GoogleMapZoomable
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible
      selectedMarkerId='pin-id'
      iconUrlFactory={() => <div />}
      onCenterChanged={_.noop}
      onZoomChanged={_.noop}
      onMarkerClick={onMarkerClick}
      onMounted={_.noop}
    />
  )

  wrapper.find(Marker).simulate('click')

  expect(onMarkerClick).toHaveBeenCalledWith('pin-id')
})

it('should handle a center changed message', () => {
  const googleMap = {
    getCenter: jest.fn().mockReturnValue({ lat: () => 1, lng: () => 2 }),
    getBounds: jest.fn().mockReturnValue({
      getNorthEast: () => ({ lat: () => 1, lng: () => 2 }),
      getSouthWest: () => ({ lat: () => 3, lng: () => 4 })
    })
  }

  const onCenterChanged = jest.fn()

  const wrapper = shallow(
    <GoogleMapZoomable
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible
      selectedMarkerId='pin-id'
      iconUrlFactory={() => <div />}
      onCenterChanged={onCenterChanged}
      onZoomChanged={_.noop}
      onMarkerClick={_.noop}
      onMounted={_.noop}
    />
  )

  wrapper.instance()._googleMap = googleMap

  wrapper.find(ReactGoogleMap).simulate('centerChanged')

  expect(googleMap.getCenter).toHaveBeenCalled()
  expect(googleMap.getBounds).toHaveBeenCalled()

  expect(onCenterChanged).toHaveBeenCalledWith({
    center: { lat: 1, lng: 2 },
    bounds: { north: 1, west: 4, south: 3, east: 2 }
  })
})

it('should handle a zoom changed event', () => {
  const googleMap = {
    getZoom: jest.fn().mockReturnValue('14'),
    getBounds: jest.fn().mockReturnValue({
      getNorthEast: () => ({ lat: () => 1, lng: () => 2 }),
      getSouthWest: () => ({ lat: () => 3, lng: () => 4 })
    })
  }

  const onZoomChanged = jest.fn()

  const wrapper = shallow(
    <GoogleMapZoomable
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible
      selectedMarkerId='pin-id'
      iconUrlFactory={() => <div />}
      onCenterChanged={_.noop}
      onZoomChanged={onZoomChanged}
      onMarkerClick={_.noop}
      onMounted={_.noop}
    />
  )

  wrapper.instance()._googleMap = googleMap

  wrapper.find(ReactGoogleMap).simulate('zoomChanged')

  expect(googleMap.getZoom).toHaveBeenCalled()
  expect(googleMap.getBounds).toHaveBeenCalled()

  expect(onZoomChanged).toHaveBeenCalledWith({
    zoom: 14,
    bounds: { north: 1, west: 4, south: 3, east: 2 }
  })
})

it('should handle componentWillUpdate when visibility is not changing', () => {
  window.setTimeout = jest.fn()

  const wrapper = shallow(
    <GoogleMapZoomable
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

  wrapper.instance().componentWillUpdate({ isVisible: true })

  expect(window.setTimeout).not.toHaveBeenCalled()
})

it('should handle componentWillUpdate when visibility is changing', () => {
  let timeoutFunc = null
  window.setTimeout = jest.fn(func => {
    timeoutFunc = func
  })

  const wrapper = shallow(
    <GoogleMapZoomable
      zoom={14}
      center={{ lat: 2, lng: 4 }}
      markers={[{ id: 'pin-id', pin: { lat: 6, lng: 7 } }]}
      isVisible={false}
      selectedMarkerId='pin-id'
      userLocation={{ lat: 1, lng: 3 }}
      iconUrlFactory={() => <div />}
      onCenterChanged={_.noop}
      onZoomChanged={_.noop}
      onMarkerClick={_.noop}
      onMounted={_.noop}
    />
  )

  wrapper.instance().componentWillUpdate({ isVisible: true })

  expect(window.setTimeout).toHaveBeenCalled()
  expect(timeoutFunc).not.toEqual(null)
  expect(() => timeoutFunc()).not.toThrow()
})
