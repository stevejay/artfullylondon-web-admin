import React from 'react'
import PropTypes from 'prop-types'

import FieldContainer from '_src/components/field/container'
import Datepicker from '_src/components/datepicker'

class DatepickerField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.minDate !== this.props.minDate ||
      nextProps.maxDate !== this.props.maxDate
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
      dateFormat,
      placeholder,
      minDate,
      maxDate
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
        <Datepicker
          value={value}
          htmlId={label}
          error={error}
          touched={touched}
          disabled={disabled}
          placeholder={placeholder}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
        />
      </FieldContainer>
    )
  }
}

DatepickerField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  dateFormat: PropTypes.string.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  containerStyle: PropTypes.object,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  placeholder: PropTypes.string
}

export default DatepickerField
