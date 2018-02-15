import React from 'react'

import EntityHeading from './heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityHeading>
      <div id='child' />
    </EntityHeading>
  )

  expect(wrapper).toMatchSnapshot()
})
