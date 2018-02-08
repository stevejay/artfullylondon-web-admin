import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import TimeGridRow from './grid-row'

class DateAndTimeEntry extends ShouldNeverUpdateComponent {
  render () {
    const { value, onDelete } = this.props

    return (
      <TimeGridRow
        keyId={value.key}
        day={value.date}
        time={value.at}
        audienceTags={value.audienceTags}
        onDelete={onDelete}
      />
    )
  }
}

DateAndTimeEntry.propTypes = {
  value: PropTypes.shape({
    key: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    at: PropTypes.string,
    audienceTags: PropTypes.array
  }).isRequired,
  onDelete: PropTypes.func
}

export default DateAndTimeEntry
