import React from 'react'
import PropTypes from 'prop-types'

import Select from '_src/components/select'
import FieldResetButton from '_src/components/field/reset-button'
import * as searchConstants from '_src/constants/search'
import './search-field.scss'

class SelectSearchField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.options !== this.props.options
    )
  }
  handleResetClick = () => {
    this.props.input.onChange(searchConstants.NO_FILTER_VALUE)
  }
  render () {
    const {
      label,
      input: { value, onChange },
      meta: { touched, error },
      options,
      disabled,
      searchable,
      multi,
      simpleValue,
      valueKey,
      labelKey,
      htmlId
    } = this.props

    const hasError = touched && !!error
    const hideResetButton =
      disabled || value === searchConstants.NO_FILTER_VALUE

    return (
      <div styleName='container'>
        <Select
          styleName='dropdown'
          value={value}
          onChange={onChange}
          name={label}
          error={hasError}
          options={options}
          disabled={disabled}
          searchable={searchable}
          multi={multi}
          simpleValue={simpleValue}
          valueKey={valueKey}
          labelKey={labelKey}
          htmlId={htmlId}
        />
        {!hideResetButton &&
          <FieldResetButton
            disabled={hideResetButton}
            onClick={this.handleResetClick}
          />}
      </div>
    )
  }
}

SelectSearchField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array
    ]),
    onChange: PropTypes.func.isRequired
  }),
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }),
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  multi: PropTypes.bool,
  simpleValue: PropTypes.bool,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default SelectSearchField
