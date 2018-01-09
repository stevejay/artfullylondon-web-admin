import React from 'react'
import PropTypes from 'prop-types'
import FieldContainer from '_src/components/field/container'
import Dropdown from './index'

class DropdownField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.options !== this.props.options
    )
  }
  render () {
    const {
      label,
      input: { value, onChange },
      meta: { touched, error },
      options,
      required,
      disabled,
      searchable,
      multi,
      simpleValue,
      valueKey,
      labelKey,
      containerStyle,
      htmlId
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
        <Dropdown
          value={value}
          onChange={onChange}
          name={label}
          error={error}
          touched={touched}
          options={options}
          disabled={disabled}
          searchable={searchable}
          multi={multi}
          simpleValue={simpleValue}
          valueKey={valueKey}
          labelKey={labelKey}
          htmlId={htmlId || label}
        />
      </FieldContainer>
    )
  }
}

DropdownField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  multi: PropTypes.bool,
  simpleValue: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  containerStyle: PropTypes.object,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default DropdownField
