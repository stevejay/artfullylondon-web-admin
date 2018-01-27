import React from 'react'
import PropTypes from 'prop-types'

import EntityImage from '_src/components/entity/image'
import EntityDescription from '_src/components/entity/description'
import DetailsContainer from '_src/components/entity/details-container'
import EntityExternalLinks from '_src/components/entity/external-links'
import EntityHeading from '_src/components/entity/heading'
import EntityWeSay from '_src/components/entity/we-say'
import EntityInfoBar from '_src/components/entity/info-bar'
import { FullTalent } from '_src/entities/talent'

const TalentDetail = ({ entity }) => (
  <React.Fragment>
    <EntityImage entity={entity} />
    <EntityHeading>{entity.name}</EntityHeading>
    <DetailsContainer type='narrow'>
      <EntityInfoBar entity={entity} />
      <EntityDescription entity={entity} />
      <EntityWeSay entity={entity} />
      <EntityExternalLinks entity={entity} />
    </DetailsContainer>
  </React.Fragment>
)

TalentDetail.propTypes = {
  entity: PropTypes.instanceOf(FullTalent).isRequired
}

export default TalentDetail
