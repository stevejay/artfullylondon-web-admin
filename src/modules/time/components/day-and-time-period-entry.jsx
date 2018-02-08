import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import TimeGridRow from '_src/components/time/grid-row'
import * as timeLib from '_src/modules/time/lib/time'

class DayAndTimePeriodEntry extends ShouldNeverUpdateComponent {
  render () {
    const { value, onDelete } = this.props

    return (
      <TimeGridRow
        keyId={value.key}
        day={timeLib.formatDayNumberForDisplay(value.day)}
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
