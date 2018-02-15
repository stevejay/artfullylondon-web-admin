import React from 'react'
import PropTypes from 'prop-types'

import {
  EntityCardContentContainer,
  EntityCardHeading,
  EntityCardSubHeading,
  EntityCardSummary
} from '_src/modules/entity'
import { SummaryEvent } from '_src/entities/event'

class EventCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <EntityCardContentContainer>
        <EntityCardHeading id={entity.id}>{entity.name}</EntityCardHeading>
        <EntityCardSubHeading>
          {entity.venueName}, {entity.postcodeDistrict}
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
