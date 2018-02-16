import React from 'react'
import PropTypes from 'prop-types'

import EntityCardContentContainer from '../entity-card/content-container'
import EntityCardHeading from '../entity-card/heading'
import { SummaryEventSeries } from '_src/entities/event-series'

class EventSeriesCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <EntityCardContentContainer>
        <EntityCardHeading id={entity.id}>{entity.name}</EntityCardHeading>
      </EntityCardContentContainer>
    )
  }
}

EventSeriesCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryEventSeries).isRequired
}

export default EventSeriesCardContent
