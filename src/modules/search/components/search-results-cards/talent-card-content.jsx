import React from 'react'
import PropTypes from 'prop-types'

import {
  EntityCardContentContainer,
  EntityCardHeading,
  EntityCardSubHeading
} from '_src/modules/entity'
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
