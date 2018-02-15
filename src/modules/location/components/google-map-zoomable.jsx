/* global google */
import React from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'
import {
  withGoogleMap,
  GoogleMap as ReactGoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'
import MarkerClusterer
  from 'react-google-maps/lib/components/addons/MarkerClusterer'

import * as locationConstants from '_src/modules/location/constants'
import * as locationLib from '_src/modules/location/lib/location'

export class GoogleMapZoomable extends React.PureComponent {
  componentWillUpdate (nextProps) {
    // http://stackoverflow.com/questions/4700594/google-maps-displaynone-problem

    if (nextProps.isVisible && nextProps.isVisible !== this.props.isVisible) {
      const googleMap = this._googleMap
      const KEY = '__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'

      window.setTimeout(() => {
        if (google && googleMap) {
          google.maps.event.trigger(googleMap.context[KEY], 'resize') // eslint-disable-line
        }
      }, 0)
    }
  }
  handleZoomChanged = () => {
    const googleMapZoom = this._googleMap.getZoom()
    const zoom = locationLib.convertGoogleMapZoomToInt(googleMapZoom)
    const googleMapBounds = this._googleMap.getBounds()

    const bounds = locationLib.convertGoogleMapBoundsToNSEWBounds(
      googleMapBounds
    )

    this.props.onZoomChanged({ zoom, bounds })
  }
  handleCenterChanged = () => {
    const googleMapCenter = this._googleMap.getCenter()

    const center = locationLib.convertGoogleMapPointToLatLngPoint(
      googleMapCenter
    )

    const googleMapBounds = this._googleMap.getBounds()

    const bounds = locationLib.convertGoogleMapBoundsToNSEWBounds(
      googleMapBounds
    )

    this.props.onCenterChanged({ center, bounds })
  }
  handleMounted = ref => {
    const { onMounted } = this.props
    this._googleMap = ref
    onMounted && onMounted(ref)
  }
  render () {
    const {
      zoom,
      center,
      markers,
      selectedMarkerId,
      onMarkerClick,
      iconUrlFactory,
      userLocation
    } = this.props

    return (
      <ReactGoogleMap
        ref={this.handleMounted}
        zoom={zoom}
        onZoomChanged={this.handleZoomChanged}
        center={center}
        onCenterChanged={this.handleCenterChanged}
        options={locationConstants.GOOGLE_MAP_OPTIONS}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={45}
          minimumClusterSize={4}
        >
          {markers.map(marker => (
            <Marker
              key={marker.id}
              position={marker.pin}
              onClick={() => onMarkerClick(marker.id)}
              icon={iconUrlFactory(marker, selectedMarkerId === marker.id)}
            />
          ))}
          {!!userLocation &&
            <Marker
              key='current-location'
              position={userLocation}
              icon={locationConstants.USER_LOCATION_IMAGE_URL}
            />}
        </MarkerClusterer>
      </ReactGoogleMap>
    )
  }
}

GoogleMapZoomable.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: locationConstants.POINT_SHAPE.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pin: locationConstants.POINT_SHAPE.isRequired
    })
  ).isRequired,
  isVisible: PropTypes.bool.isRequired,
  selectedMarkerId: PropTypes.string,
  userLocation: locationConstants.POINT_SHAPE,
  iconUrlFactory: PropTypes.func.isRequired,
  onCenterChanged: PropTypes.func.isRequired,
  onZoomChanged: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onMounted: PropTypes.func
}

export default withScriptjs(withGoogleMap(GoogleMapZoomable))
