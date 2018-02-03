import React from 'react'
import { shallow } from 'enzyme'

import { root } from '_src/index'

it('should render correctly', () => {
  const RootWrapper = () => root
  const wrapper = shallow(<RootWrapper />)
  expect(wrapper).toMatchSnapshot()
})
