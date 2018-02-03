import React from 'react'
import { shallow } from 'enzyme'

import SectionHeading from '_src/components/section/heading'

it('should render correctly', () => {
  const wrapper = shallow(<SectionHeading><div id='child' /></SectionHeading>)
  expect(wrapper).toMatchSnapshot()
})
