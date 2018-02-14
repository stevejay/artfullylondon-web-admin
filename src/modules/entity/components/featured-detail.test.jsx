import React from 'react'
import { shallow } from 'enzyme'

import EntityFeaturedDetail from './featured-detail'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetail heading='The Heading'>
      <div id='child' />
    </EntityFeaturedDetail>
  )

  expect(wrapper).toMatchSnapshot()
})