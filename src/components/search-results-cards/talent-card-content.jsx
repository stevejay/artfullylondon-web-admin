import React from 'react'
import PropTypes from 'prop-types'

import ContentContainer from '_src/components/entity-card/content-container'
import Heading from '_src/components/entity-card/heading'
import SubHeading from '_src/components/entity-card/sub-heading'
import { SummaryTalent } from '_src/entities/talent'

class TalentCardContent extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { entity } = this.props

    return (
      <ContentContainer>
        <Heading id={entity.id}>{entity.name}</Heading>
        <SubHeading>{entity.commonRole}</SubHeading>
      </ContentContainer>
    )
  }
}

TalentCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryTalent).isRequired
}

export default TalentCardContent
