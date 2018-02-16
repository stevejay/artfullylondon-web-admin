import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import TimeGridRow from './grid-row'
import * as timeLib from '../lib/time'

class DayAndTimeEntry extends ShouldNeverUpdateComponent {
  render () {
    const { value, onDelete } = this.props

    return (
      <TimeGridRow
        keyId={value.key}
        day={timeLib.formatDayNumberForDisplay(value.day)}
        time={value.at}
        timesRange={value.timesRangeId}
        audienceTags={value.audienceTags}
        onDelete={onDelete}
      />
    )
  }
}

DayAndTimeEntry.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    at: PropTypes.string.isRequired,
    timesRangeId: PropTypes.string,
    audienceTags: PropTypes.array
  }).isRequired,
  onDelete: PropTypes.func
}

export default DayAndTimeEntry
