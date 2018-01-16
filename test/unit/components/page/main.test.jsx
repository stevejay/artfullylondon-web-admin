import React from 'react'
import { shallow } from 'enzyme'

import PageMain from '_src/components/page/main'

it('should render correctly', () => {
  const wrapper = shallow(<PageMain><div id='child' /></PageMain>)
  expect(wrapper).toMatchSnapshot()
})
