import React from 'react'
import _ from 'lodash'

import { EventDetail } from './event-detail'
import { FullEvent } from '_src/domain/event'
import * as dateLib from '_src/lib/date'
import * as eventActions from '../actions'
import EventTalentCarousel from './talent-carousel'

dateLib.getTodayDateAsString = jest.fn().mockReturnValue('2018/01/01')

it('should render a current event correctly', () => {
  const entity = new FullEvent({
    name: 'Name',
    images: [],
    venue: { latitude: 1, longitude: 2 }
  })

  entity.isExpiredOn = jest.fn().mockReturnValue(false)

  const wrapper = shallow(
    <EventDetail entity={entity} selectedTalentId={null} dispatch={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a current event correctly that has full details', () => {
  const entity = new FullEvent({
    name: 'Name',
    images: [],
    venue: { latitude: 1, longitude: 2 },
    eventSeries: {},
    tags: [{ id: 'medium/theatre', label: 'theatre' }],
    talents: [{ lastName: 'Last' }]
  })

  entity.isExpiredOn = jest.fn().mockReturnValue(false)

  const wrapper = shallow(
    <EventDetail entity={entity} selectedTalentId={null} dispatch={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an expired event correctly', () => {
  const entity = new FullEvent({
    name: 'Name',
    images: [],
    venue: { latitude: 1, longitude: 2 }
  })

  entity.isExpiredOn = jest.fn().mockReturnValue(true)

  const wrapper = shallow(
    <EventDetail entity={entity} selectedTalentId={null} dispatch={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle selecting a talent', () => {
  const entity = new FullEvent({
    name: 'Name',
    images: [],
    venue: { latitude: 1, longitude: 2 }
  })

  entity.isExpiredOn = jest.fn().mockReturnValue(false)
  const dispatch = jest.fn()

  const wrapper = shallow(
    <EventDetail entity={entity} selectedTalentId={null} dispatch={dispatch} />
  )

  wrapper.find(EventTalentCarousel).prop('onTalentSelected')({
    talentId: 'some-talent-id'
  })

  expect(dispatch).toHaveBeenCalledWith(
    eventActions.updateSelectedTalent('some-talent-id')
  )
})
