import React from 'react'
import PropTypes from 'prop-types'
import AdditionalDetailHeading
  from '_src/components/entity/additional-detail-heading'
import AdditionalDetailContent
  from '_src/components/entity/additional-detail-content'
import { LINK_TYPE_ACCESS } from '_src/constants/link'
import * as accessLib from '_src/lib/access'

class DisabilityAccess extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const {
      wheelchairAccessType,
      disabledBathroomType,
      hearingFacilitiesType,
      links
    } = this.props

    const accessLink = links.getLinkByType(LINK_TYPE_ACCESS)

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

DisabilityAccess.propTypes = {
  wheelchairAccessType: PropTypes.string.isRequired,
  disabledBathroomType: PropTypes.string.isRequired,
  hearingFacilitiesType: PropTypes.string.isRequired,
  links: PropTypes.object.isRequired
}

export default DisabilityAccess
