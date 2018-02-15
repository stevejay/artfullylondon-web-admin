import React from 'react'
import PropTypes from 'prop-types'

import {
  EntityDescription,
  EntityDetailsContainer,
  EntityHeading,
  EntityWeSay,
  EntityInfoBar
} from '_src/modules/entity'
import { Image } from '_src/modules/image'
import { ExternalLinks } from '_src/modules/link'
import { FullTalent } from '_src/entities/talent'

const TalentDetail = ({ entity }) => (
  <React.Fragment>
    <Image entityType={entity.entityType} images={entity.images} />
    <EntityHeading>{entity.name}</EntityHeading>
    <EntityDetailsContainer type='narrow'>
      <EntityInfoBar entity={entity} />
      <EntityDescription entity={entity} />
      <EntityWeSay entity={entity} />
      <ExternalLinks entity={entity} />
    </EntityDetailsContainer>
  </React.Fragment>
)

TalentDetail.propTypes = {
  entity: PropTypes.instanceOf(FullTalent).isRequired
}

export default TalentDetail
