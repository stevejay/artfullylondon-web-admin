import React from 'react'

import EventMainDetails from './main-details'
import { FullEvent } from '_src/domain/event'

it('should render correctly', () => {
  const event = new FullEvent({
    venue: { url: 'http://some/venue/url', name: 'Venue Name' }
  })

  event.createEventOccurrenceDescriptionOn = jest
    .fn()
    .mockReturnValue('Event occurrence description')

  event.createAgeDescription = jest.fn().mockReturnValue('Age description')
  event.createCostDescription = jest.fn().mockReturnValue('Cost description')

  event.createBookingDescriptionOn = jest
    .fn()
    .mockReturnValue('Booking description')

  const wrapper = shallow(
    <EventMainDetails event={event} dateStr='2017/01/18' />
  )

  expect(wrapper).toMatchSnapshot()
})
