import React from 'react'
import PropTypes from 'prop-types'

import ShouldNeverUpdateComponent
  from '_src/components/base-class/should-never-update'
import AdditionalDetailHeading
  from '_src/modules/entity/components/additional-detail-heading'
import AdditionalDetailContent
  from '_src/modules/entity/components/additional-detail-content'

class EntityAddress extends ShouldNeverUpdateComponent {
  render () {
    const { fullAddress } = this.props

    return (
      <React.Fragment>
        <AdditionalDetailHeading>
          Address
        </AdditionalDetailHeading>
        <AdditionalDetailContent>
          {fullAddress}
        </AdditionalDetailContent>
      </React.Fragment>
    )
  }
}

EntityAddress.propTypes = {
  fullAddress: PropTypes.string.isRequired
}

export default EntityAddress
