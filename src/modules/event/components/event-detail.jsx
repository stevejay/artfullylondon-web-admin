import React from 'react'
import PropTypes from 'prop-types'

import {
  EntityDescription,
  EntityDetailsContainer,
  EntityHeading,
  EntityInfoBar
  // EntityWeSay
} from '_src/modules/entity'
import { Image } from '_src/modules/image'
// import { ExternalLinks } from '_src/modules/link'
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
