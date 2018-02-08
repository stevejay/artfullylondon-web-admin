import React from 'react'
import PropTypes from 'prop-types'

import EntityImage from '_src/modules/entity/components/image'
import EntityDescription from '_src/modules/entity/components/description'
import EntityDetailsContainer
  from '_src/modules/entity/components/details-container'
import EntityExternalLinks from '_src/modules/entity/components/external-links'
import EntityHeading from '_src/modules/entity/components/heading'
import EntityWeSay from '_src/modules/entity/components/we-say'
import EntityInfoBar from '_src/modules/entity/components/info-bar'
import { FullTalent } from '_src/entities/talent'

const TalentDetail = ({ entity }) => (
  <React.Fragment>
    <EntityImage entityType={entity.entityType} images={entity.images} />
    <EntityHeading>{entity.name}</EntityHeading>
    <EntityDetailsContainer type='narrow'>
      <EntityInfoBar entity={entity} />
      <EntityDescription entity={entity} />
      <EntityWeSay entity={entity} />
      <EntityExternalLinks entity={entity} />
    </EntityDetailsContainer>
  </React.Fragment>
)

TalentDetail.propTypes = {
  entity: PropTypes.instanceOf(FullTalent).isRequired
}

export default TalentDetail
