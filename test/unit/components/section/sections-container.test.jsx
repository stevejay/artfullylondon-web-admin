import React from 'react'
import { shallow } from 'enzyme'

import SectionsContainerSection
  from '_src/components/section/sections-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <SectionsContainerSection><div id='child' /></SectionsContainerSection>
  )

  expect(wrapper).toMatchSnapshot()
})
