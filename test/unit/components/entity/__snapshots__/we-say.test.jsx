import React from 'react'
import { shallow } from 'enzyme'

import EntityWeSay from '_admin/components/entity/we-say'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityWeSay>
      <div id='child' />
    </EntityWeSay>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no content', () => {
  const wrapper = shallow(<EntityWeSay />)
  expect(wrapper).toMatchSnapshot()
})
