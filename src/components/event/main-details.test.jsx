import React from 'react'
import { shallow } from 'enzyme'

import EventMainDetails from '_src/components/event/main-details'
import { FullEvent } from '_src/entities/event'

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

it('should not update', () => {
  const event = new FullEvent({ venue: {} })
  event.createEventOccurrenceDescriptionOn = jest.fn().mockReturnValue('')
  event.createAgeDescription = jest.fn().mockReturnValue('')
  event.createCostDescription = jest.fn().mockReturnValue('')
  event.createBookingDescriptionOn = jest.fn().mockReturnValue('')

  const wrapper = shallow(
    <EventMainDetails event={event} dateStr='2017/01/18' />
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
