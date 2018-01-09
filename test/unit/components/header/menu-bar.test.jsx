import React from 'react'
import { shallow } from 'enzyme'

import HeaderMenuBar from '_src/components/header/menu-bar'

it('should render correctly', () => {
  const wrapper = shallow(<HeaderMenuBar><div id='child' /></HeaderMenuBar>)
  expect(wrapper).toMatchSnapshot()
})
