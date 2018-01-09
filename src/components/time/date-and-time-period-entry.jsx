import React from 'react'
import PropTypes from 'prop-types'
import TimeGridRow from '_src/components/time/grid-row'

class DateAndTimePeriodEntry extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { value, onDelete } = this.props

    return (
      <TimeGridRow
        keyId={value.key}
        day={value.date}
        time={value.from ? `${value.from} to ${value.to}` : null}
        audienceTags={value.audienceTags}
        onDelete={onDelete}
      />
    )
  }
}

DateAndTimePeriodEntry.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    from: PropTypes.string,
    to: PropTypes.string,
    audienceTags: PropTypes.array
  }).isRequired,
  onDelete: PropTypes.func
}

export default DateAndTimePeriodEntry
