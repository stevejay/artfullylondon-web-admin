import React from 'react'

import BasicSection from '_src/components/section/basic'

it('should render correctly', () => {
  const wrapper = shallow(<BasicSection><div id='child' /></BasicSection>)
  expect(wrapper).toMatchSnapshot()
})
