import React from 'react'
import { shallow } from 'enzyme'

import ToolbarItem from '_src/components/toolbar/item'

it('should render correctly', () => {
  const wrapper = shallow(<ToolbarItem><div id='child' /></ToolbarItem>)
  expect(wrapper).toMatchSnapshot()
})

it('should render an empty item correctly', () => {
  const wrapper = shallow(<ToolbarItem />)
  expect(wrapper).toMatchSnapshot()
})
