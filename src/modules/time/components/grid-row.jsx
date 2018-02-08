import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import GridRow from '_src/components/grid/row'
import './grid-row.scss'

class TimeGridRow extends ShouldNeverUpdateComponent {
  render () {
    const { keyId, day, time, audienceTags, onDelete, timesRange } = this.props
    const hasAudienceTags = !!audienceTags && audienceTags.length > 0

    return (
      <GridRow id={keyId} onDelete={onDelete}>
        <span styleName='date'>{day}</span>
        {!!time && <span styleName='time'>{time}</span>}
        {!!timesRange && <span styleName='times-range'>From {timesRange}</span>}
        {hasAudienceTags &&
          <div styleName='tags'>
            {audienceTags.map(tag => (
              <span styleName='tag' key={tag.id}>{tag.label}</span>
            ))}
          </div>}
      </GridRow>
    )
  }
}

TimeGridRow.propTypes = {
  keyId: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  time: PropTypes.string,
  timesRange: PropTypes.string,
  audienceTags: PropTypes.array,
  onDelete: PropTypes.func
}

export default TimeGridRow
