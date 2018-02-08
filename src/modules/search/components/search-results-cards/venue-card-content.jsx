import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from '_src/modules/entity/components/entity-card/content-container'
import Heading from '_src/modules/entity/components/entity-card/heading'
import Summary from '_src/modules/entity/components/entity-card/summary'
import { SummaryVenue } from '_src/entities/venue'

class VenueCardContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
        <Summary>
          {entity.createFullAddress()}
        </Summary>
      </ContentContainer>
    )
  }
}

VenueCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryVenue).isRequired
}

export default VenueCardContent
