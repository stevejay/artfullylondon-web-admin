import React from 'react'
import _ from 'lodash'

import EventTalentCarousel from './talent-carousel'
import { EventSummaryTalent } from '_src/entities/talent'
import IconButton from '_src/components/button/icon'

it('should render correctly', () => {
  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-1'
      onTalentSelected={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when the selected talent id is null', () => {
  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId={null}
      onTalentSelected={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is only one talent', () => {
  const wrapper = shallow(
    <EventTalentCarousel
      talents={[new EventSummaryTalent({ id: 'talent-1' })]}
      selectedTalentId='talent-1'
      onTalentSelected={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are no talents', () => {
  const wrapper = shallow(
    <EventTalentCarousel talents={[]} onTalentSelected={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a left arrow click when there is an image to the left', () => {
  const handleTalentSelected = jest.fn()

  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-2'
      onTalentSelected={handleTalentSelected}
    />
  )

  wrapper.find(IconButton).at(1).simulate('click')

  expect(handleTalentSelected).toHaveBeenCalledWith({ talentId: 'talent-1' })
})

it('should handle a left arrow click when it should wrap around', () => {
  const handleTalentSelected = jest.fn()

  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-1'
      onTalentSelected={handleTalentSelected}
    />
  )

  wrapper.find(IconButton).at(1).simulate('click')

  expect(handleTalentSelected).toHaveBeenCalledWith({ talentId: 'talent-2' })
})

it('should handle a right arrow click when there is an image to the right', () => {
  const handleTalentSelected = jest.fn()

  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-1'
      onTalentSelected={handleTalentSelected}
    />
  )

  wrapper.find(IconButton).at(0).simulate('click')

  expect(handleTalentSelected).toHaveBeenCalledWith({ talentId: 'talent-2' })
})

it('should handle a right arrow click when it should wrap around', () => {
  const handleTalentSelected = jest.fn()

  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new EventSummaryTalent({ id: 'talent-1' }),
        new EventSummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-2'
      onTalentSelected={handleTalentSelected}
    />
  )

  wrapper.find(IconButton).at(0).simulate('click')

  expect(handleTalentSelected).toHaveBeenCalledWith({ talentId: 'talent-1' })
})
