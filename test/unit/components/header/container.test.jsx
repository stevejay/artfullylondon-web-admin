import React from 'react'
import { shallow } from 'enzyme'

import HeaderContainer from '_src/components/header/container'

it('should render correctly', () => {
  const wrapper = shallow(<HeaderContainer><div id='child' /></HeaderContainer>)
  expect(wrapper).toMatchSnapshot()
})
