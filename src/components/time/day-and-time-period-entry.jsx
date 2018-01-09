import React from 'react'
import PropTypes from 'prop-types'
import { formatDayNumberForDisplay } from '_src/lib/time'
import TimeGridRow from '_src/components/time/grid-row'

class DayAndTimePeriodEntry extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { value, onDelete } = this.props

    return (
      <TimeGridRow
        keyId={value.key}
        day={formatDayNumberForDisplay(value.day)}
        time={`${value.from} to ${value.to}`}
        timesRange={value.timesRangeId}
        audienceTags={value.audienceTags}
        onDelete={onDelete}
      />
    )
  }
}

DayAndTimePeriodEntry.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    timesRangeId: PropTypes.string,
    audienceTags: PropTypes.array
  }).isRequired,
  onDelete: PropTypes.func
}

export default DayAndTimePeriodEntry
