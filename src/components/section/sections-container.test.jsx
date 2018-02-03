import React from 'react'
import { shallow } from 'enzyme'

import SectionsContainer from '_src/components/section/sections-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <SectionsContainer><div id='child' /></SectionsContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
