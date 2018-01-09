import React from 'react'
import PropTypes from 'prop-types'
import ContentContainer from '_src/components/entity-card/content-container'
import Heading from '_src/components/entity-card/heading'
import { SummaryEventSeries } from '_src/entities/event-series'

class EventSeriesCardContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
      </ContentContainer>
    )
  }
}

EventSeriesCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryEventSeries).isRequired
}

export default EventSeriesCardContent
