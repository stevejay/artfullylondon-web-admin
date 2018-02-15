import React from 'react'
import PropTypes from 'prop-types'

import EntityDescription from '_src/modules/entity/components/description'
import EntityDetailsContainer
  from '_src/modules/entity/components/details-container'
import { Image } from '_src/modules/image'
// import { ExternalLinks } from '_src/modules/link'
import EntityHeading from '_src/modules/entity/components/heading'
// import EntityWeSay from '_src/modules/entity/components/we-say'
import EntityInfoBar from '_src/modules/entity/components/info-bar'
import { FullEvent } from '_src/entities/event'

const EventDetail = ({ entity }) => (
  <React.Fragment>
    <Image entityType={entity.entityType} images={entity.images} />
    <EntityHeading>{entity.name}</EntityHeading>
    <EntityDetailsContainer type='narrow'>
      <EntityInfoBar entity={entity} />
      <EntityDescription entity={entity} />
      {/* <EntityWeSay entity={entity} />
      <ExternalLinks entity={entity} /> */}
    </EntityDetailsContainer>
  </React.Fragment>
)

EventDetail.propTypes = {
  entity: PropTypes.instanceOf(FullEvent).isRequired
}

export default EventDetail
