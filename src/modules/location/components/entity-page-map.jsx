import React from 'react'
import PropTypes from 'prop-types'
import window from 'global/window'

import ShouldNeverUpdateComponent
  from '_src/shared/components/base-class/should-never-update'
import Loader from '_src/shared/components/loader'
import GoogleMapStatic from './google-map-static'
import * as locationLib from '../lib/location'
import * as locationConstants from '../constants'
import './entity-page-map.scss'

const CONTAINER_ELEMENT_STYLE = { height: '100%' }

class EntityMap extends ShouldNeverUpdateComponent {
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
