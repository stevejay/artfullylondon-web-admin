import React from 'react'
import { shallow } from 'enzyme'

import { root } from '_src/index'

it('should render correctly', () => {
  const TestComponent = () => root
  const wrapper = shallow(<TestComponent />)
  expect(wrapper).toMatchSnapshot()
})
