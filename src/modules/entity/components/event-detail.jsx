import React from 'react'
import PropTypes from 'prop-types'

import { FullEvent } from '_src/entities/event'

const EventDetail = ({ entity }) => (
  <React.Fragment>
    TODO EventDetail
  </React.Fragment>
)

EventDetail.propTypes = {
  entity: PropTypes.instanceOf(FullEvent).isRequired
}

export default EventDetail
