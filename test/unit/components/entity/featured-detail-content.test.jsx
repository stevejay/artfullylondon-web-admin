import React from 'react'
import { shallow } from 'enzyme'

import EntityFeaturedDetailContent
  from '_admin/components/entity/featured-detail-content'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailContent>
      <div id='child' />
    </EntityFeaturedDetailContent>
  )

  expect(wrapper).toMatchSnapshot()
})
