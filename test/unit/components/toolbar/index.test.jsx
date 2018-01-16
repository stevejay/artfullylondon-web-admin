import React from 'react'
import { shallow } from 'enzyme'

import Toolbar from '_src/components/toolbar'

it('should render correctly', () => {
  const wrapper = shallow(<Toolbar><div id='child' /></Toolbar>)
  expect(wrapper).toMatchSnapshot()
})
