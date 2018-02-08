import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import * as timeLib from '_src/lib/time'
import './entry.scss'

class OpeningTimesEntry extends ShouldNeverUpdateComponent {
  render () {
    const { label, times, type } = this.props
    const labelStyle = `label-${type}`

    if (!times || times.length === 0) {
      return (
        <div>
          <span styleName={labelStyle}>{label}</span>
          <span styleName='time'>Closed</span>
        </div>
      )
    }

    return (
      <div>
        {times.map((time, i) => (
          <div key={label + i}>
            {<span styleName={labelStyle}>{i === 0 ? label : ''}</span>}
            <span styleName='time'>
              {timeLib.formatOpeningTimesOrPerformanceTimeForDisplay(time)}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

OpeningTimesEntry.propTypes = {
  label: PropTypes.string.isRequired,
  times: PropTypes.array,
  type: PropTypes.oneOf(['basic', 'additional', 'special', 'closure'])
    .isRequired
}

export default OpeningTimesEntry
