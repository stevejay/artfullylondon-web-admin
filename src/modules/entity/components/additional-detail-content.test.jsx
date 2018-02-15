import React from 'react'

import EntityAdditionalDetailContent
  from './additional-detail-content'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailContent>
      <div id='child' />
    </EntityAdditionalDetailContent>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityAdditionalDetailContent>
      <div id='child' />
    </EntityAdditionalDetailContent>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
