import React from 'react'
import PropTypes from 'prop-types'
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs
} from 'react-google-maps'

import * as locationConstants from '../constants'
import * as locationLib from '../lib/location'
import './editor-map.scss'

const EditorGoogleMap = withScriptjs(
  withGoogleMap(
    /* istanbul ignore next */
    props => (
      <GoogleMap
        defaultZoom={props.defaultZoom}
        defaultCenter={props.defaultCenter}
        onClick={props.onClick}
        options={locationConstants.GOOGLE_MAP_OPTIONS}
      >
        {!locationLib.isEmptyPin(props.value) &&
          <Marker position={props.value} />}
      </GoogleMap>
    )
  )
)

class EditorMap extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      this.props.disabled !== nextProps.disabled ||
      this.props.value !== nextProps.value
    )
  }
  handleClick = event => {
    const { onChange } = this.props

    const value = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }

    onChange(value)
  }
  render () {
    const { onChange, ...rest } = this.props

    return (
      <EditorGoogleMap
        {...rest}
        onClick={this.handleClick}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div className='editor-map' />}
        loadingElement={<div className='editor-map' />}
        googleMapURL={locationConstants.GOOGLE_MAP_SCRIPT_URL}
      />
    )
  }
}

EditorMap.propTypes = {
  value: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }).isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  defaultZoom: PropTypes.number
}

EditorMap.defaultProps = {
  defaultZoom: 14
}

export default EditorMap
