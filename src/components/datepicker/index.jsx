import React from 'react'
import PropTypes from 'prop-types'
import CalendarIcon from 'react-icons/lib/fa/calendar'

import Text from '_src/components/text'
import DatepickerModal from '_src/components/datepicker/modal'

// TODO think about a better way to control the modal.

class Datepicker extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { showModal: false }
  }
  handleClick = event => {
    event.preventDefault()
    this.setState({ showModal: true })
  }
  handleHideModal = () => {
    this.setState({ showModal: false })
  }
  render () {
    const {
      value,
      onChange,
      htmlId,
      error,
      touched,
      disabled,
      minDate,
      maxDate,
      placeholder
    } = this.props

    return (
      <React.Fragment>
        <Text
          value={value}
          id={htmlId}
          error={error}
          touched={touched}
          disabled={disabled}
          readOnly
          maxLength={20}
          placeholder={placeholder}
          forceSingleLine
          icon={CalendarIcon}
          onClick={this.handleClick}
        />
        <DatepickerModal
          show={this.state.showModal}
          title='Choose a date'
          value={value}
          minDate={minDate}
          maxDate={maxDate}
          onHide={this.handleHideModal}
          onChange={onChange}
        />
      </React.Fragment>
    )
  }
}

Datepicker.propTypes = {
  value: PropTypes.string.isRequired,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dateFormat: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.any,
  touched: PropTypes.any,
  disabled: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  placeholder: PropTypes.string
}

export default Datepicker
