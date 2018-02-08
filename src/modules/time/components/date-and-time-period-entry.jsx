import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import TimeGridRow from './grid-row'

class DateAndTimePeriodEntry extends ShouldNeverUpdateComponent {
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
