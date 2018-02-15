import React from 'react'
import PropTypes from 'prop-types'

import {
  EntityCardContentContainer,
  EntityCardHeading,
  EntityCardSummary
} from '_src/modules/entity'
import { SummaryVenue } from '_src/entities/venue'

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
