import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from '_src/components/entity-card/content-container'
import Heading from '_src/components/entity-card/heading'
import SubHeading from '_src/components/entity-card/sub-heading'
import Summary from '_src/components/entity-card/summary'
import Pusher from '_src/components/pusher'
import { SummaryEvent } from '_src/entities/event'

class EventCardContent extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.dateStr !== this.props.dateStr
  }
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
        <SubHeading>{entity.venueName}, {entity.postcodeDistrict}</SubHeading>
        <Summary>{entity.summary}</Summary>
        <Pusher />
      </ContentContainer>
    )
  }
}

EventCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryEvent).isRequired,
  dateStr: PropTypes.string.isRequired
}

export default EventCardContent
