import React from 'react'
import PropTypes from 'prop-types'

import AdditionalDetailHeading
  from '_src/components/entity/additional-detail-heading'
import AdditionalDetailContent
  from '_src/components/entity/additional-detail-content'

class EntityAddress extends React.Component {
  shouldComponentUpdate () {
    return false
  }
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
