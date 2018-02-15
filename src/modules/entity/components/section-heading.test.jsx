import React from 'react'

import EntitySectionHeading from './section-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntitySectionHeading>
      <div id='child' />
    </EntitySectionHeading>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntitySectionHeading>
      <div id='child' />
    </EntitySectionHeading>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
