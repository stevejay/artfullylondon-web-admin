import React from 'react'
import PropTypes from 'prop-types'

import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'
import Message from '_src/components/message'
import Tag from '_src/components/tag'
import AdditionalDetailHeading
  from '_src/components/entity/additional-detail-heading'
import OpeningTimeEntry from '_src/components/opening-times/entry'
import './index.scss'

class OpeningTimes extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.dateStr !== this.props.dateStr
  }
  render () {
    const { dateStr, entity } = this.props
    const timesDetails = entity.createTimesDetailsOn(dateStr)

    if (!timesDetails) {
      return null
    }

    const times = timesDetails.times
    const hasRegularTimes = times.regularTimes.length > 0
    const hasAdditionalTimes = times.additionalTimes.length > 0
    const hasSpecialTimes = times.specialTimes.length > 0
    const hasClosures = times.closures.length > 0
    // const hasAnyTimes = hasRegularTimes || hasAdditionalTimes
    const showAdditionalTimesHeader = hasRegularTimes && hasAdditionalTimes

    return (
      <div>
        <AdditionalDetailHeading>
          {timesDetails.regularTimesHeader}
        </AdditionalDetailHeading>
        <div styleName='details-container'>
          {hasRegularTimes &&
            <div styleName='details-column'>
              <div styleName='times-container'>
                {times.regularTimes.map(day => (
                  <OpeningTimeEntry
                    key={day.label}
                    label={day.label}
                    times={day.times}
                    type='basic'
                  />
                ))}
              </div>
            </div>}
          {hasAdditionalTimes &&
            <div styleName='details-column'>
              {showAdditionalTimesHeader &&
                <AdditionalDetailHeading>
                  {timesDetails.additionalTimesHeader}
                </AdditionalDetailHeading>}
              <div styleName='times-container'>
                {times.additionalTimes.map(x => (
                  <OpeningTimeEntry
                    key={x.label}
                    label={x.label}
                    times={x.times}
                    type='additional'
                  />
                ))}
              </div>
            </div>}
          {hasSpecialTimes &&
            <div styleName='details-column'>
              <AdditionalDetailHeading>
                {timesDetails.specialTimesHeader}
              </AdditionalDetailHeading>
              {times.specialTimes.map(x => (
                <div key={x.tagLabel}>
                  <Tag tag={{ label: x.tagLabel }} styleName='tag' />
                  <div styleName='times-container'>
                    {x.times.map(x => (
                      <OpeningTimeEntry
                        key={x.label}
                        label={x.label}
                        times={[x]}
                        type='special'
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>}
          {hasClosures &&
            <div styleName='details-column'>
              <AdditionalDetailHeading>
                Closures
              </AdditionalDetailHeading>
              <div styleName='times-container'>
                {times.closures.map(x => (
                  <OpeningTimeEntry
                    key={x.label}
                    label={x.label}
                    times={x.times}
                    type='closure'
                  />
                ))}
              </div>
            </div>}
        </div>
        <Message type='basic'>
          <span styleName='small'>
            Please contact the venue to confirm these times
            before making a special trip, especially during holidays.
          </span>
        </Message>
      </div>
    )
  }
}

OpeningTimes.propTypes = {
  dateStr: PropTypes.string.isRequired,
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(FullVenue),
    PropTypes.instanceOf(FullEvent)
  ]).isRequired
}

export default OpeningTimes
