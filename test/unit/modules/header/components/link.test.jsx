import React from 'react'
import { shallow } from 'enzyme'

import HeaderLink from '_src/modules/header/components/link'

it('should render correctly', () => {
  const wrapper = shallow(<HeaderLink label='The Label' to='/to/here' />)
  expect(wrapper).toMatchSnapshot()
})
