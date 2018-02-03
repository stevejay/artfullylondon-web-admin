import React from 'react'
import { shallow } from 'enzyme'

import EntityFeaturedDetailContent
  from '_src/components/entity/featured-detail-content'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailContent>
      <div id='child' />
    </EntityFeaturedDetailContent>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailContent>
      <div id='child' />
    </EntityFeaturedDetailContent>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
