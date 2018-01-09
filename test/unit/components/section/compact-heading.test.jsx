import React from 'react'
import { shallow } from 'enzyme'

import CompactHeadingSection from '_src/components/section/compact-heading'

it('should render correctly', () => {
  const wrapper = shallow(
    <CompactHeadingSection><div id='child' /></CompactHeadingSection>
  )

  expect(wrapper).toMatchSnapshot()
})
