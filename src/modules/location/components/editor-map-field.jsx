import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/shared/components/field/container'
import FieldBorder from '_src/shared/components/field/border'
import EditorMap from './editor-map'

class EditorMapField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled
    )
  }
  render () {
    const {
      label,
      input: { value, onChange },
      meta: { touched, error },
      required,
      disabled,
      containerStyle,
      defaultCenter
    } = this.props

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
        required={required}
        disabled={disabled}
        style={containerStyle}
      >
        <FieldBorder>
          <EditorMap
            value={value}
            onChange={onChange}
            disabled={disabled}
            defaultCenter={defaultCenter}
          />
        </FieldBorder>
      </FieldContainer>
    )
  }
}

EditorMapField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  containerStyle: PropTypes.object
}

export default EditorMapField
