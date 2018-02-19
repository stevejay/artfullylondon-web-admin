import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Message from '_src/components/message'
import { SummaryEventSeries } from '_src/domain/event-series'

class EventSeriesLink extends React.PureComponent {
  render () {
    const { eventSeries } = this.props

    return (
      <Message type='basic'>
        This event is part of
        a {eventSeries.eventSeriesTypeLabel} of events
        called
        {' '}
        <Link to={`/event-series/${eventSeries.id}`}>{eventSeries.name}</Link>
        .
      </Message>
    )
  }
}

EventSeriesLink.propTypes = {
  eventSeries: PropTypes.instanceOf(SummaryEventSeries).isRequired
}

export default EventSeriesLink
