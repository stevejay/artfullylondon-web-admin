import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from '_src/modules/entity/components/entity-card/content-container'
import Heading from '_src/modules/entity/components/entity-card/heading'
import SubHeading from '_src/modules/entity/components/entity-card/sub-heading'
import Summary from '_src/modules/entity/components/entity-card/summary'
import { SummaryEvent } from '_src/entities/event'

class EventCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
        <SubHeading>{entity.venueName}, {entity.postcodeDistrict}</SubHeading>
        <Summary>{entity.summary}</Summary>
      </ContentContainer>
    )
  }
}

EventCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryEvent).isRequired,
  dateStr: PropTypes.string.isRequired
}

export default EventCardContent
