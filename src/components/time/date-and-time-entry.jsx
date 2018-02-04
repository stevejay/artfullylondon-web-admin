import React from 'react'
import PropTypes from 'prop-types'

import TimeGridRow from '_src/components/time/grid-row'

class DateAndTimeEntry extends React.Component {
  shouldComponentUpdate () {
    return false
  }
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
