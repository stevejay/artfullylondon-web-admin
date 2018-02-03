import React from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

import StaticGoogleMap from '_src/components/google-map/static'
import Loader from '_src/components/loader'
import * as locationLib from '_src/lib/location'
import * as googleMapConstants from '_src/constants/google-map'
import * as locationConstants from '_src/constants/location'
import './map.scss'

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
      <StaticGoogleMap
        zoom={zoom}
        pin={pin}
        userLocation={userLocation}
        onPinClick={this.handlePinClick}
        containerElement={<div style={CONTAINER_ELEMENT_STYLE} />}
        mapElement={<div className='entity-map' />}
        loadingElement={
          <div className='entity-map'><Loader size='large' /></div>
        }
        googleMapURL={googleMapConstants.SCRIPT_URL}
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
