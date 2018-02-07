import React from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

import Loader from '_src/components/loader'
import GoogleMapStatic from '_src/modules/location/components/google-map-static'
import * as locationLib from '_src/modules/location/lib/location'
import * as locationConstants from '_src/modules/location/constants'
import './entity-page-map.scss'

const CONTAINER_ELEMENT_STYLE = { height: '100%' }

class EntityMap extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  handlePinClick = () => {
    const pin = this.props.pin
    const url = locationLib.createGoogleMapLinkUrl(pin.lat, pin.lng, 16)
    window.open(url, '_blank')
  }
  render () {
    const { zoom, pin, userLocation } = this.props

    return (
      <GoogleMapStatic
        zoom={zoom}
        pin={pin}
        userLocation={userLocation}
        onPinClick={this.handlePinClick}
        containerElement={<div style={CONTAINER_ELEMENT_STYLE} />}
        mapElement={<div className='entity-map' />}
        loadingElement={
          <div className='entity-map'><Loader size='large' /></div>
        }
        googleMapURL={locationConstants.GOOGLE_MAP_SCRIPT_URL}
      />
    )
  }
}

EntityMap.propTypes = {
  zoom: PropTypes.number.isRequired,
  pin: locationConstants.POINT_SHAPE.isRequired,
  userLocation: locationConstants.POINT_SHAPE
}

export default EntityMap
