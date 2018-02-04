import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'

import * as mapConstants from '_src/constants/google-map'
import * as locationConstants from '_src/constants/location'
import * as imageConstants from '_src/constants/image'

export class StaticGoogleMap extends React.PureComponent {
  render () {
    const { zoom, pin, userLocation, onPinClick } = this.props

    return (
      <GoogleMap defaultZoom={zoom} center={pin} options={mapConstants.OPTIONS}>
        <Marker position={pin} onClick={onPinClick} />
        {!!userLocation &&
          <Marker
            key='current-location'
            position={userLocation}
            icon={imageConstants.USER_LOCATION_IMAGE_URL}
          />}
      </GoogleMap>
    )
  }
}

StaticGoogleMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  pin: locationConstants.POINT_SHAPE.isRequired,
  userLocation: locationConstants.POINT_SHAPE,
  onPinClick: PropTypes.func.isRequired
}

export default withScriptjs(withGoogleMap(StaticGoogleMap))
