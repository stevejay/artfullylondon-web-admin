import React from 'react'
import PropTypes from 'prop-types'

import { FullVenue } from '_src/domain/venue'
import { FullEvent } from '_src/domain/event'
import Message from '_src/components/message'
import { Tag } from '_src/modules/tag'
import AdditionalDetailHeading from './additional-detail-heading'
import OpeningTimeEntry from './opening-times-entry'
import './opening-times.scss'

class OpeningTimes extends React.PureComponent {
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
