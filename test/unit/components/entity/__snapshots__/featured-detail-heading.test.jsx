import React from 'react'
import { shallow } from 'enzyme'

import EntityFeaturedDetailHeading
  from '_admin/components/entity/featured-detail-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetailHeading>
      <div id='child' />
    </EntityFeaturedDetailHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
