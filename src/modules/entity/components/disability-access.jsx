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

class EntityDisabilityAccess extends ShouldNeverUpdateComponent {
  render () {
    const {
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      links
    } = this.props

    const accessLink = links.getLinkByType(linkConstants.LINK_TYPE_ACCESS)

    const accessText = accessLib.getAccessText(
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      !!accessLink
    )

    return (
      <div>
        <AdditionalDetailHeading>Disability Access</AdditionalDetailHeading>
        <AdditionalDetailContent>
          {accessText}
          {!!accessLink &&
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
  wheelchairAccessType: PropTypes.string.isRequired,
  disabledBathroomType: PropTypes.string.isRequired,
  hearingFacilitiesType: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired
}

export default EntityDisabilityAccess
