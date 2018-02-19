import React from 'react'
import _ from 'lodash'

import EntityInfoBar from './info-bar'
import { FullVenue } from '_src/domain/venue'
import { FullEvent } from '_src/domain/event'

it('should render an info bar for a venue correctly', () => {
  const mockVenue = new FullVenue({ id: 'some-venue-id' })
  mockVenue.getInfoBarLabel = jest.fn().mockReturnValue('Tags Label')
  mockVenue.getLinkByType = jest.fn().mockReturnValue('http://homepage/link')

  const wrapper = shallow(
    <EntityInfoBar entity={mockVenue} onClickCopy={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an info bar for an event correctly', () => {
  const mockEvent = new FullEvent({ id: 'some-event-id', venue: {} })
  mockEvent.getInfoBarLabel = jest.fn().mockReturnValue('Tags Label')
  mockEvent.getLinkByType = jest.fn().mockReturnValue('http://homepage/link')

  const wrapper = shallow(
    <EntityInfoBar entity={mockEvent} onClickCopy={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const mockVenue = new FullVenue({ id: 'some-venue-id' })
  mockVenue.getInfoBarLabel = jest.fn().mockReturnValue('Tags Label')
  mockVenue.getLinkByType = jest.fn().mockReturnValue('http://homepage/link')

  const wrapper = shallow(
    <EntityInfoBar entity={mockVenue} onClickCopy={_.noop} />
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
