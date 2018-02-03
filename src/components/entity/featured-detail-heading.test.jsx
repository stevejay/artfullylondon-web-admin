import React from 'react'
import { shallow } from 'enzyme'

import EntityFeaturedDetailHeading
  from '_src/components/entity/featured-detail-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailHeading>
      <div id='child' />
    </EntityFeaturedDetailHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailHeading>
      <div id='child' />
    </EntityFeaturedDetailHeading>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
