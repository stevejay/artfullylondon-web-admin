import React from 'react'
import PropTypes from 'prop-types'
import CalendarIcon from 'react-icons/lib/fa/calendar'
import Text from '_src/components/text'
import DatepickerModal from '_src/components/datepicker/modal'

class Datepicker extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.value !== this.props.value ||
      nextProps.error !== this.props.error ||
      nextProps.touched !== this.props.touched ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.minDate !== this.props.minDate ||
      nextProps.maxDate !== this.props.maxDate
    )
  }
  handleClick = () => {
    const { disabled, value, minDate, maxDate } = this.props

    if (disabled) {
      return
    }

    this.props.showModal({
      component: DatepickerModal,
      componentProps: {
        title: 'Select a date',
        value,
        minDate,
        maxDate,
        onSubmit: values =>
          new Promise(resolve => {
            this.props.onChange(values.date)
            resolve()
          })
      }
    })
  }
  render () {
    const { value, htmlId, error, touched, disabled, placeholder } = this.props

    return (
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
    )
  }
}

Datepicker.propTypes = {
  value: PropTypes.string.isRequired,
  htmlId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dateFormat: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  error: PropTypes.any,
  touched: PropTypes.any,
  disabled: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  placeholder: PropTypes.string
}

export default Datepicker
