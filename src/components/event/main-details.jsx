import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import FeaturedDetail from '_src/components/entity/featured-detail'
import { FullEvent } from '_src/entities/event'
import './main-details.scss'

class EventMainDetails extends React.Component {
  shouldComponentUpdate () {
    return false
  }
  render () {
    const { event, dateStr } = this.props
    const ageDescription = event.createAgeDescription()

    // TODO remove double dot on event.venue props.

    return (
      <div styleName='container'>
        <FeaturedDetail heading='When'>
          {event.createEventOccurrenceDescriptionOn(dateStr)}
        </FeaturedDetail>
        <FeaturedDetail heading='Where'>
          <Link to={event.venue.url}>{event.venue.name}</Link>
        </FeaturedDetail>
        <FeaturedDetail heading='Cost'>
          {event.createCostDescription()}
        </FeaturedDetail>
        <FeaturedDetail heading='Booking'>
          {event.createBookingDescriptionOn(dateStr)}
        </FeaturedDetail>
        {!!ageDescription &&
          <FeaturedDetail heading='Age'>
            {ageDescription}
          </FeaturedDetail>}
      </div>
    )
  }
}

EventMainDetails.propTypes = {
  event: PropTypes.instanceOf(FullEvent).isRequired,
  dateStr: PropTypes.string.isRequired
}

export default EventMainDetails
