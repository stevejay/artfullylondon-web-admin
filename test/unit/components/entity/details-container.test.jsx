import React from 'react'
import { shallow } from 'enzyme'

import EntityDetailsContainer from '_admin/components/entity/details-container'

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
