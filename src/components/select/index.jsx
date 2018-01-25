import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import './index.scss'

class Select extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.error !== this.props.error ||
      nextProps.touched !== this.props.touched ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.options !== this.props.options
    )
  }
  handleChange = option => {
    this.props.onChange(this.props.multi ? option : option[this.props.valueKey])
  }
  render () {
    const {
      name,
      value,
      error,
      touched,
      options,
      disabled,
      searchable,
      multi,
      valueKey,
      labelKey,
      simpleValue,
      htmlId,
      onChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props

    const dropdownDisabled = disabled || options.length === 0
    const hasError = !!error && !!touched

    return (
      <div {...rest} styleName={hasError ? 'error' : ''}>
        <ReactSelect
          value={value}
          id={htmlId}
          tabIndex={disabled ? '-1' : '0'}
          onChange={this.handleChange}
          options={options}
          name={name}
          disabled={!!dropdownDisabled}
          searchable={!!searchable}
          multi={!!multi}
          simpleValue={!!simpleValue}
          valueKey={valueKey}
          labelKey={labelKey}
          autoBlur={!multi}
          backspaceToRemoveMessage=''
          clearable={false}
        />
      </div>
    )
  }
}

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ]),
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.any,
  touched: PropTypes.any,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  multi: PropTypes.bool,
  simpleValue: PropTypes.bool
}

Select.defaultProps = {
  valueKey: 'value',
  labelKey: 'label'
}

export default Select
