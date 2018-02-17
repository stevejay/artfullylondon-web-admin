import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import AdditionalDetailHeading from './additional-detail-heading'
import AdditionalDetailContent from './additional-detail-content'
import linkType from '_src/entities/link-type'
import * as accessLib from '../lib/access'
import { FullVenue } from '_src/entities/venue'
import { FullEvent } from '_src/entities/event'

class EntityDisabilityAccess extends ShouldNeverUpdateComponent {
  render () {
    const { entity } = this.props

    const {
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType
    } = entity

    const accessLink = entity.getLinkByType(linkType.ACCESS)
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
