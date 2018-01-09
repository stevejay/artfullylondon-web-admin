import React from 'react'
import { shallow } from 'enzyme'

import MinimalLogo from '_src/components/logo/minimal'

it('should render correctly', () => {
  const wrapper = shallow(<MinimalLogo />)
  expect(wrapper).toMatchSnapshot()
})
