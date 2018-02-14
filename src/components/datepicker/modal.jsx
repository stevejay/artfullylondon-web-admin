import React from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'

import Modal from '_src/components/modal'
import ModalContainer from '_src/components/modal/container'
import FadeTransition from '_src/components/transition/fade'
import * as dateLib from '_src/lib/date'
import './modal.scss'

const MIN_JS_DATE = new Date(0)
const MAX_JS_DATE = new Date(8640000000000000)

class DatepickerModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = this._createState(props)
  }
  componentWillReceiveProps (nextProps) {
    if (
      nextProps.value !== this.props.value ||
      nextProps.minDate !== this.props.minDate ||
      nextProps.maxDate !== this.props.maxDate
    ) {
      this.setState(this._createState(nextProps))
    }
  }
  handleDayClick = day => {
    this.props.onChange(dateLib.mapJsDateToStringDate(day))
    this.props.onHide()
  }
  selectedDays = day => {
    const { selectedDay } = this.state
    return !!selectedDay && DateUtils.isSameDay(selectedDay, day)
  }
  disabledDays = day =>
    !DateUtils.isDayInRange(day, {
      from: this.state.from || MIN_JS_DATE,
      to: this.state.to || MAX_JS_DATE
    })
  _createState (props) {
    return {
      selectedDay: dateLib.mapStringDateToJsDate(props.value),
      from: dateLib.mapStringDateToJsDate(props.minDate),
      to: dateLib.mapStringDateToJsDate(props.maxDate)
    }
  }
  render () {
    const { title, show, onHide } = this.props
    const { selectedDay, from } = this.state

    return (
      <Modal
        show={show}
        transition={FadeTransition}
        onHide={onHide}
        aria-label='Datepicker'
      >
        <ModalContainer title={title} type='narrow' onHide={onHide}>
          <DayPicker
            styleName='datepicker'
            selectedDays={this.selectedDays}
            disabledDays={this.disabledDays}
            enableOutsideDays={false}
            initialMonth={selectedDay || from || undefined}
            onDayClick={this.handleDayClick}
          />
        </ModalContainer>
      </Modal>
    )
  }
}

DatepickerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default DatepickerModal
