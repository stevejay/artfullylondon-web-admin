import React from 'react'
import PropTypes from 'prop-types'

import { FullVenue } from '_src/entities/venue'

const VenueDetail = ({ entity }) => (
  <React.Fragment>
    TODO VenueDetail
  </React.Fragment>
)

VenueDetail.propTypes = {
  entity: PropTypes.instanceOf(FullVenue).isRequired
}

export default VenueDetail
