import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'
import * as googleMapConstants from '_src/constants/google-map'
import './index.m.scss'

function isEmpty (pin) {
  return !pin || pin.lat === null || pin.lng === null
}

const EditorGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={props.defaultZoom}
      defaultCenter={props.defaultCenter}
      onClick={props.onClick}
      options={googleMapConstants.OPTIONS}
    >
      {!isEmpty(props.value) && <Marker position={props.value} />}
    </GoogleMap>
  ))
)

class Map extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.disabled !== nextProps.disabled ||
      this.props.value !== nextProps.value
    )
  }
  handleClick = event => {
    const { onChange } = this.props

    if (onChange) {
      const value = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }

      onChange(value)
    }
  }
  render () {
    return (
      <EditorGoogleMap
        {...this.props}
        onClick={this.handleClick}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div className='map' />}
        loadingElement={<div className='map' />}
        googleMapURL={googleMapConstants.SCRIPT_URL}
      />
    )
  }
}

Map.propTypes = {
  value: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  defaultZoom: PropTypes.number
}

Map.defaultProps = {
  defaultZoom: 14
}

export default Map
