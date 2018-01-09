import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EventTalentCarousel from '_src/components/event/talent-carousel'
import { SummaryTalent } from '_src/entities/talent'

it('should render correctly', () => {
  const wrapper = shallow(
    <EventTalentCarousel
      talents={[
        new SummaryTalent({ id: 'talent-1' }),
        new SummaryTalent({ id: 'talent-2' })
      ]}
      selectedTalentId='talent-1'
      onTalentSelected={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is only one talent', () => {
  const wrapper = shallow(
    <EventTalentCarousel
      talents={[new SummaryTalent({ id: 'talent-1' })]}
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
