import React from 'react'
import { shallow } from 'enzyme'

import HeaderLogo from '_admin/components/header/logo'

it('should render a small header logo correctly', () => {
  const wrapper = shallow(<HeaderLogo size='small' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a medium header logo correctly', () => {
  const wrapper = shallow(<HeaderLogo size='medium' />)
  expect(wrapper).toMatchSnapshot()
})
