import React from 'react'
import PropTypes from 'prop-types'

import EntityCardContentContainer from '../entity-card/content-container'
import EntityCardHeading from '../entity-card/heading'
import EntityCardSubHeading from '../entity-card/sub-heading'
import { SummaryTalent } from '_src/entities/talent'

class TalentCardContent extends React.PureComponent {
  render () {
    const { entity } = this.props

    return (
      <EntityCardContentContainer>
        <EntityCardHeading id={entity.id}>{entity.name}</EntityCardHeading>
        <EntityCardSubHeading>{entity.commonRole}</EntityCardSubHeading>
      </EntityCardContentContainer>
    )
  }
}

TalentCardContent.propTypes = {
  entity: PropTypes.instanceOf(SummaryTalent).isRequired
}

export default TalentCardContent
