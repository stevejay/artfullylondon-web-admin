import React from 'react'

import EntityColumnLayout from './column-layout'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityColumnLayout>
      <div id='child' />
    </EntityColumnLayout>
  )

  expect(wrapper).toMatchSnapshot()
})
