import React from 'react'
import PropTypes from 'prop-types'

import FeaturedDetail from '_src/modules/entity/components/featured-detail'
import * as timeLib from '_src/lib/time'
import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'
import './current-times.scss'

class CurrentTimes extends React.Component {
  shouldComponentUpdate (nextProps) {
    return (
      nextProps.dateStr !== this.props.dateStr ||
      nextProps.timeStr !== this.props.timeStr
    )
  }
  render () {
    const { dateStr, timeStr, entity, namedClosuresLookup } = this.props
    const tomorrowStr = timeLib.addDaysToStringDate(dateStr, 1)

    const timesTodayStr = entity.createTimesDescriptionForDate(
      dateStr,
      timeStr,
      namedClosuresLookup
    )

    const timesTomorrowStr = entity.createTimesDescriptionForDate(
      tomorrowStr,
      null,
      namedClosuresLookup
    )

    if (!timesTodayStr && !timesTomorrowStr) {
      return null
    }

    return (
      <div styleName='summary-container'>
        <FeaturedDetail heading='Today'>
          {timesTodayStr}
        </FeaturedDetail>
        <FeaturedDetail heading='Tomorrow'>
          {timesTomorrowStr}
        </FeaturedDetail>
      </div>
    )
  }
}

CurrentTimes.propTypes = {
  dateStr: PropTypes.string.isRequired,
  timeStr: PropTypes.string.isRequired,
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(FullVenue),
    PropTypes.instanceOf(FullEvent)
  ]).isRequired,
  namedClosuresLookup: PropTypes.object.isRequired
}

export default CurrentTimes
