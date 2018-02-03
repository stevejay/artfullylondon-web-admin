import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import moment from 'moment'

import { DATE_FORMAT } from '_src/constants/time'
import DatepickerModal from '_src/components/datepicker/modal'
import Select from '_src/components/select'
import Text from '_src/components/text'
import FieldResetButton from '_src/components/field/reset-button'
import {
  ALLOWED_DATE_PRESET_TYPES,
  DATE_PRESET_TYPE_DATE,
  DATE_PRESET_TYPE_THIS_WEEKEND,
  DATE_PRESET_TYPE_DROPDOWN_OPTIONS
} from '_src/constants/search'
import * as browserConstants from '_src/constants/browser'
import './search-field.scss'

class DatepickerSearchField extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.input.value !== this.props.input.value ||
      nextProps.meta.touched !== this.props.meta.touched ||
      nextProps.meta.error !== this.props.meta.error ||
      nextProps.disabled !== this.props.disabled
    )
  }
  _convertToMoment (date) {
    return !!date && date !== '' ? moment(date, DATE_FORMAT) : null
  }
  handleClickText = () => {
    const { input: { value, onChange }, disabled, minDate } = this.props

    if (disabled) {
      return
    }

    this.props.showModal({
      component: DatepickerModal,
      componentProps: {
        title: 'Select a date',
        value,
        minDate,
        onSubmit: values =>
          new Promise(resolve => {
            onChange(values.date)
            resolve()
          })
      }
    })
  }
  handleResetClick = () => {
    this.props.input.onChange(DATE_PRESET_TYPE_THIS_WEEKEND)
  }
  handleKeyPressClose = event => {
    if (event.charCode === browserConstants.ENTER_CHARCODE) {
      this.handleClickClose()
    }
  }
  handleChangeDropdown = value => {
    if (value === DATE_PRESET_TYPE_DATE) {
      this.props.input.onChange('')
      setTimeout(this.handleClickText, 0)
    } else {
      this.props.input.onChange(value)
    }
  }
  render () {
    const { input: { value } } = this.props

    return _.includes(ALLOWED_DATE_PRESET_TYPES, value)
      ? this.renderSelect()
      : this.renderDatepicker()
  }
  renderSelect () {
    const {
      input: { value },
      meta: { touched, error },
      disabled,
      htmlId
    } = this.props

    return (
      <div styleName='container'>
        <Select
          styleName='dropdown'
          value={value}
          onChange={this.handleChangeDropdown}
          name={htmlId}
          error={error}
          touched={touched}
          disabled={disabled}
          options={DATE_PRESET_TYPE_DROPDOWN_OPTIONS}
          searchable={false}
          multi={false}
          htmlId={htmlId}
        />
      </div>
    )
  }
  renderDatepicker () {
    const {
      input: { value },
      meta: { touched, error },
      disabled,
      dateFormat,
      htmlId
    } = this.props

    const momentValue = this._convertToMoment(value)

    const formattedValue = momentValue
      ? momentValue.format(dateFormat)
      : 'Select a date...'

    const hasError = touched && !!error

    return (
      <div styleName='container'>
        <div styleName='text-wrapper'>
          <Text
            styleName='text'
            value={formattedValue}
            id={htmlId}
            error={hasError}
            disabled={disabled}
            readOnly
            maxLength={100}
            forceSingleLine
            onClick={this.handleClickText}
          />
        </div>
        <FieldResetButton disabled={disabled} onClick={this.handleResetClick} />
      </div>
    )
  }
}

DatepickerSearchField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.any
  }).isRequired,
  disabled: PropTypes.bool,
  minDate: PropTypes.string,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dateFormat: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  showModal: PropTypes.func.isRequired
}

export default DatepickerSearchField
