import React from 'react'

import EntityDetailsContainer from './details-container'

it('should render a default container correctly', () => {
  const wrapper = shallow(
    <EntityDetailsContainer>
      <div id='child' />
    </EntityDetailsContainer>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a narrow container correctly', () => {
  const wrapper = shallow(
    <EntityDetailsContainer type='narrow'>
      <div id='child' />
    </EntityDetailsContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
