import React from 'react'
import { shallow } from 'enzyme'

import EventMainDetails from '_src/components/event/main-details'
import { FullEvent } from '_src/entities/event'

it('should render correctly', () => {
  const mockEvent = new FullEvent({
    venue: { url: 'http://some/venue/url', name: 'Venue Name' }
  })

  mockEvent.createEventOccurrenceDescriptionOn = jest
    .fn()
    .mockReturnValue('Event occurrence description')

  mockEvent.createAgeDescription = jest.fn().mockReturnValue('Age description')

  mockEvent.createCostDescription = jest
    .fn()
    .mockReturnValue('Cost description')

  mockEvent.createBookingDescriptionOn = jest
    .fn()
    .mockReturnValue('Booking description')

  const wrapper = shallow(
    <EventMainDetails event={mockEvent} dateStr='2017/01/18' />
  )

  expect(wrapper).toMatchSnapshot()
})
