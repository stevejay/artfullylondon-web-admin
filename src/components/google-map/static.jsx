import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'
import * as mapConstants from '_src/constants/google-map'
import { POINT_SHAPE } from '_src/constants/location'
import { USER_LOCATION_IMAGE_URL } from '_src/constants/image'

export class StaticGoogleMap extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.zoom !== this.props.zoom || nextProps.pin !== this.props.pin
    )
  }
  render () {
    const { zoom, pin, userLocation, onPinClick } = this.props

    return (
      <GoogleMap defaultZoom={zoom} center={pin} options={mapConstants.OPTIONS}>
        <Marker position={pin} onClick={onPinClick} />
        {!!userLocation &&
          <Marker
            key='current-location'
            position={userLocation}
            icon={USER_LOCATION_IMAGE_URL}
          />}
      </GoogleMap>
    )
  }
}

StaticGoogleMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  pin: POINT_SHAPE.isRequired,
  userLocation: POINT_SHAPE,
  onPinClick: PropTypes.func.isRequired
}

export default withScriptjs(withGoogleMap(StaticGoogleMap))
