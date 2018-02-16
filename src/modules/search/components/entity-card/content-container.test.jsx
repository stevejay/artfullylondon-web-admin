import React from 'react'

import EntityCardContentContainer from './content-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardContentContainer>
      <div id='child' />
    </EntityCardContentContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardContentContainer>
      <div id='child' />
    </EntityCardContentContainer>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
