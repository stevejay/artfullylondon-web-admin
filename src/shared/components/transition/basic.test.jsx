import React from 'react'

import BasicTransition from '_src/shared/components/transition/basic'

it('should render correctly', () => {
  const wrapper = mount(<BasicTransition><div id='child' /></BasicTransition>)
  expect(wrapper).toMatchSnapshot()
})
