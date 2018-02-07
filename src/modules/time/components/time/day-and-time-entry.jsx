import React from 'react'
import PropTypes from 'prop-types'

import * as timeLib from '_src/lib/time'
import TimeGridRow from '_src/components/time/grid-row'

class DayAndTimeEntry extends React.Component {
  shouldComponentUpdate () {
    return false
  }
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
