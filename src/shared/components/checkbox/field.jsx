import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/shared/components/field/container'
import Checkbox from '_src/shared/components/checkbox'

class CheckboxField extends React.Component {
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
      checkboxLabel
    } = this.props

    return (
      <FieldContainer
        label={label}
        htmlFor={label}
        error={error}
        touched={touched}
        required={required}
        disabled={disabled}
      >
        <Checkbox
          checked={value}
          onChange={onChange}
          error={error}
          touched={touched}
          disabled={disabled}
        >
          {checkboxLabel}
        </Checkbox>
      </FieldContainer>
    )
  }
}

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  checkboxLabel: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool
}

export default CheckboxField
