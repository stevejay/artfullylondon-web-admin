import React from 'react'
import PropTypes from 'prop-types'

import AdditionalDetailHeading
  from '_src/components/entity/additional-detail-heading'
import AdditionalDetailContent
  from '_src/components/entity/additional-detail-content'

class Address extends React.Component {
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

Address.propTypes = {
  fullAddress: PropTypes.string.isRequired
}

export default Address
