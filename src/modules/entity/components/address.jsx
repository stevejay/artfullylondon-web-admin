import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import AdditionalDetailHeading from './additional-detail-heading'
import AdditionalDetailContent from './additional-detail-content'
import { FullVenue } from '_src/domain/venue'

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
  venue: PropTypes.instanceOf(FullVenue).isRequired
}

export default EntityAddress
