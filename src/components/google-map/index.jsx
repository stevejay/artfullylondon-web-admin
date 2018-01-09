/* global google */
import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap as ReactGoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'
import MarkerClusterer
  from 'react-google-maps/lib/components/addons/MarkerClusterer'
import { POINT_SHAPE } from '_src/constants/location'
import * as mapConstants from '_src/constants/google-map'
import * as location from '_src/lib/location'
import { USER_LOCATION_IMAGE_URL } from '_src/constants/image'

export class GoogleMap extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.zoom !== this.props.zoom ||
      nextProps.center !== this.props.center ||
      nextProps.markers !== this.props.markers ||
      nextProps.selectedMarkerId !== this.props.selectedMarkerId ||
      nextProps.isVisible !== this.props.isVisible ||
      nextProps.userLocation !== this.props.userLocation
    )
  }
  componentWillUpdate (nextProps) {
    // http://stackoverflow.com/questions/4700594/google-maps-displaynone-problem

    if (nextProps.isVisible && nextProps.isVisible !== this.props.isVisible) {
      const googleMap = this._googleMap
      const KEY = '__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'

      setTimeout(() => {
        if (google && googleMap) {
          google.maps.event.trigger(googleMap.context[KEY], 'resize') // eslint-disable-line
        }
      }, 0)
    }
  }
  handleZoomChanged = () => {
    const googleMapZoom = this._googleMap.getZoom()
    const zoom = location.convertGoogleMapZoomToInt(googleMapZoom)
    const googleMapBounds = this._googleMap.getBounds()
    const bounds = location.convertGoogleMapBoundsToNSEWBounds(googleMapBounds)
    this.props.onZoomChanged({ zoom, bounds })
  }
  handleCenterChanged = () => {
    const googleMapCenter = this._googleMap.getCenter()
    const center = location.convertGoogleMapPointToLatLngPoint(googleMapCenter)
    const googleMapBounds = this._googleMap.getBounds()
    const bounds = location.convertGoogleMapBoundsToNSEWBounds(googleMapBounds)
    this.props.onCenterChanged({ center, bounds })
  }
  handleMounted = ref => {
    const { onMounted } = this.props
    this._googleMap = ref

    if (onMounted) {
      onMounted(ref)
    }
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
        options={mapConstants.OPTIONS}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={45}
          minimumClusterSize={4}
        >
          {markers.map(marker => {
            const isSelected = selectedMarkerId === marker.id

            return (
              <Marker
                key={marker.id}
                position={marker.pin}
                onClick={() => onMarkerClick(marker.id)}
                icon={iconUrlFactory(marker, isSelected)}
              />
            )
          })}
          {!!userLocation &&
            <Marker
              key='current-location'
              position={userLocation}
              icon={USER_LOCATION_IMAGE_URL}
            />}
        </MarkerClusterer>
      </ReactGoogleMap>
    )
  }
}

GoogleMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: POINT_SHAPE.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      pin: POINT_SHAPE.isRequired
    })
  ).isRequired,
  isVisible: PropTypes.bool.isRequired,
  selectedMarkerId: PropTypes.string,
  userLocation: POINT_SHAPE,
  iconUrlFactory: PropTypes.func.isRequired,
  onCenterChanged: PropTypes.func.isRequired,
  onZoomChanged: PropTypes.func.isRequired,
  onMarkerClick: PropTypes.func.isRequired,
  onMounted: PropTypes.func
}

export default withScriptjs(withGoogleMap(GoogleMap))
