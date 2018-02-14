import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import AdditionalDetailHeading
  from '_src/modules/entity/components/additional-detail-heading'
import AdditionalDetailContent
  from '_src/modules/entity/components/additional-detail-content'
import * as linkConstants from '_src/constants/link'
import * as accessLib from '_src/lib/access'
import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'

class EntityDisabilityAccess extends ShouldNeverUpdateComponent {
  render () {
    const {
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      links
    } = this.props.entity

    const accessLink = links.getLinkByType(linkConstants.LINK_TYPE_ACCESS)
    const hasAccessLink = !!accessLink

    const accessText = accessLib.getAccessText(
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      hasAccessLink
    )

    return (
      <div>
        <AdditionalDetailHeading>Disability Access</AdditionalDetailHeading>
        <AdditionalDetailContent>
          {accessText}
          {accessText && hasAccessLink && '\u00a0'}
          {hasAccessLink &&
            <span>
              See
              <a href={accessLink.url} target='_blank' rel='noopener'>
                this page
              </a>
              for full access details.
            </span>}
        </AdditionalDetailContent>
      </div>
    )
  }
}

EntityDisabilityAccess.propTypes = {
  entity: PropTypes.oneOfType([
    PropTypes.instanceOf(FullVenue),
    PropTypes.instanceOf(FullEvent)
  ]).isRequired
}

export default EntityDisabilityAccess
