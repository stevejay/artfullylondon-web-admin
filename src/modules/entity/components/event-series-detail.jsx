import React from 'react'
import PropTypes from 'prop-types'

import { FullEventSeries } from '_src/entities/event-series'

const EventSeriesDetail = ({ entity }) => (
  <React.Fragment>
    TODO EventSeriesDetail
  </React.Fragment>
)

EventSeriesDetail.propTypes = {
  entity: PropTypes.instanceOf(FullEventSeries).isRequired
}

export default EventSeriesDetail
