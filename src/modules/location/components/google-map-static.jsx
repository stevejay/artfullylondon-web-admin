import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'

import * as locationConstants from '_src/modules/location/constants'

export class GoogleMapStatic extends React.PureComponent {
  render () {
    const { zoom, pin, userLocation, onPinClick } = this.props

    return (
      <GoogleMap
        defaultZoom={zoom}
        center={pin}
        options={locationConstants.GOOGLE_MAP_OPTIONS}
      >
        <Marker position={pin} onClick={onPinClick} />
        {!!userLocation &&
          <Marker
            key='current-location'
            position={userLocation}
            icon={locationConstants.USER_LOCATION_IMAGE_URL}
          />}
      </GoogleMap>
    )
  }
}

GoogleMapStatic.propTypes = {
  zoom: PropTypes.number.isRequired,
  pin: locationConstants.POINT_SHAPE.isRequired,
  userLocation: locationConstants.POINT_SHAPE,
  onPinClick: PropTypes.func.isRequired
}

export default withScriptjs(withGoogleMap(GoogleMapStatic))
