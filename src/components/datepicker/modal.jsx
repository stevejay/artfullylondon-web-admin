import React from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'
import {
  getMinJSDate,
  getMaxJSDate,
  mapJsDateToStringDate
} from '_src/lib/time'
// import ModalContainer from '_src/components/modal/container'
import './modal.scss'

const MIN_JS_DATE = getMinJSDate()
const MAX_JS_DATE = getMaxJSDate()

class DatepickerModal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedDay: this._convertToJSDate(props.value),
      from: this._convertToJSDate(props.minDate),
      to: this._convertToJSDate(props.maxDate)
    }
  }
  _convertToJSDate (date) {
    if (!date || date === '') {
      return null
    }

    const matches = date.match(/^(\d\d\d\d)\/(\d\d)\/(\d\d)$/)
    if (!matches) {
      throw new Error(`Not in a valid date format: ${date}`)
    }

    return new Date(
      parseInt(matches[1]),
      parseInt(matches[2] - 1),
      parseInt(matches[3])
    )
  }
  handleDayClick = (_, day, { _selected }) => {
    this.props
      .onSubmit({ date: mapJsDateToStringDate(day) })
      .then(() => this.props.onHide())
  }
  selectedDays = day => {
    const { selectedDay } = this.state
    return selectedDay && DateUtils.isSameDay(selectedDay, day)
  }
  disabledDays = day => {
    const { from, to } = this.state
    return !DateUtils.isDayInRange(day, {
      from: from || MIN_JS_DATE,
      to: to || MAX_JS_DATE
    })
  }
  render () {
    const { selectedDay, from } = this.state

    return (
      // <ModalContainer title={title} type='narrow' onHide={onHide}>
      (
        <DayPicker
          styleName='daypicker'
          selectedDays={this.selectedDays}
          disabledDays={this.disabledDays}
          enableOutsideDays={false}
          initialMonth={selectedDay || from || undefined}
          onDayClick={this.handleDayClick}
        />
      )
      // </ModalContainer>
    )
  }
}

DatepickerModal.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string
}

export default DatepickerModal
