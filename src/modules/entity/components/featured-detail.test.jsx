import React from 'react'

import EntityFeaturedDetail from './featured-detail'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityFeaturedDetail heading='The Heading'>
      <div id='child' />
    </EntityFeaturedDetail>
  )

  expect(wrapper).toMatchSnapshot()
})
