import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { EntityFeaturedDetail } from '_src/modules/entity'
import { FullEvent } from '_src/domain/event'
import './main-details.scss'

class EventMainDetails extends React.PureComponent {
  render () {
    const { event, dateStr } = this.props
    const ageDescription = event.createAgeDescription()

    // TODO remove double dot on event.venue props.

    return (
      <div styleName='container'>
        <EntityFeaturedDetail heading='When'>
          {event.createEventOccurrenceDescriptionOn(dateStr)}
        </EntityFeaturedDetail>
        <EntityFeaturedDetail heading='Where'>
          <Link to={event.venue.url}>{event.venue.name}</Link>
        </EntityFeaturedDetail>
        <EntityFeaturedDetail heading='Cost'>
          {event.createCostDescription()}
        </EntityFeaturedDetail>
        <EntityFeaturedDetail heading='Booking'>
          {event.createBookingDescriptionOn(dateStr)}
        </EntityFeaturedDetail>
        {!!ageDescription &&
          <EntityFeaturedDetail heading='Age'>
            {ageDescription}
          </EntityFeaturedDetail>}
      </div>
    )
  }
}

EventMainDetails.propTypes = {
  event: PropTypes.instanceOf(FullEvent).isRequired,
  dateStr: PropTypes.string.isRequired
}

export default EventMainDetails
