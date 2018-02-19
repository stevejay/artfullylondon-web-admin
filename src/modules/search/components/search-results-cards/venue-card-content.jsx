import React from 'react'
import PropTypes from 'prop-types'

import EntityCardContentContainer from '../entity-card/content-container'
import EntityCardHeading from '../entity-card/heading'
import EntityCardSummary from '../entity-card/summary'
import { SummaryVenue } from '_src/domain/venue'

class VenueCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <EntityCardContentContainer>
        <EntityCardHeading id={entity.id}>{entity.name}</EntityCardHeading>
        <EntityCardSummary>
          {entity.createFullAddress()}
        </EntityCardSummary>
      </EntityCardContentContainer>
    )
  }
}

VenueCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryVenue).isRequired
}

export default VenueCardContent
