import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import AdditionalDetailHeading
  from '_src/modules/entity/components/additional-detail-heading'
import AdditionalDetailContent
  from '_src/modules/entity/components/additional-detail-content'
import { SummaryVenue } from '_src/entities/venue'

class EntityAddress extends ShouldNeverUpdateComponent {
  render () {
    return (
      <React.Fragment>
        <AdditionalDetailHeading>
          Address
        </AdditionalDetailHeading>
        <AdditionalDetailContent>
          {this.props.venue.createFullAddress()}
        </AdditionalDetailContent>
      </React.Fragment>
    )
  }
}

EntityAddress.propTypes = {
  venue: PropTypes.instanceOf(SummaryVenue).isRequired
}

export default EntityAddress
