import React from 'react'

import EntityCardSummary from './summary'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardSummary>
      <div id='child' />
    </EntityCardSummary>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardSummary>
      <div id='child' />
    </EntityCardSummary>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})