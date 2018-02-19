import React from 'react'
import PropTypes from 'prop-types'

import EntityCardContentContainer from '../entity-card/content-container'
import EntityCardHeading from '../entity-card/heading'
import EntityCardSubHeading from '../entity-card/sub-heading'
import EntityCardSummary from '../entity-card/summary'
import { SummaryEvent } from '_src/domain/event'

class EventCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <EntityCardContentContainer>
        <EntityCardHeading id={entity.id}>{entity.name}</EntityCardHeading>
        <EntityCardSubHeading>
          {entity.venueName}, {entity.getPostcodeDistrict()}
        </EntityCardSubHeading>
        <EntityCardSummary>{entity.summary}</EntityCardSummary>
      </EntityCardContentContainer>
    )
  }
}

EventCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryEvent).isRequired,
  dateStr: PropTypes.string.isRequired
}

export default EventCardContent
