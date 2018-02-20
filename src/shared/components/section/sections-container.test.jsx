import React from 'react'

import SectionsContainer from '_src/shared/components/section/sections-container'

it('should render correctly', () => {
  const wrapper = shallow(
    <SectionsContainer><div id='child' /></SectionsContainer>
  )

  expect(wrapper).toMatchSnapshot()
})
