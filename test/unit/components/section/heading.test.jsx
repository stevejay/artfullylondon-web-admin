import React from 'react'
import { shallow } from 'enzyme'

import HeadingSection from '_src/components/section/heading'

it('should render correctly', () => {
  const wrapper = shallow(<HeadingSection><div id='child' /></HeadingSection>)

  expect(wrapper).toMatchSnapshot()
})
