import React from 'react'
import PropTypes from 'prop-types'
import ContentContainer from '_src/components/entity-card/content-container'
import Heading from '_src/components/entity-card/heading'
import SubHeading from '_src/components/entity-card/sub-heading'
import Summary from '_src/components/entity-card/summary'
import { SummaryVenue } from '_src/entities/venue'

const SUMMARY_STYLE = { marginRight: '3rem' }

class VenueCardContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
        <SubHeading>{entity.venueType}</SubHeading>
        <Summary style={SUMMARY_STYLE}>
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
