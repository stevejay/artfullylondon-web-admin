import React from 'react'

import FadeTransition from '_src/shared/components/transition/fade'

it('should render correctly', () => {
  const wrapper = mount(
    <FadeTransition in={false}><div id='child' /></FadeTransition>
  )

  expect(wrapper).toMatchSnapshot()
})
