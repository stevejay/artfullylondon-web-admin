import React from 'react'
import { mount } from 'enzyme'

import FadeTransition from '_src/components/transition/fade'

it('should render correctly', () => {
  const wrapper = mount(
    <FadeTransition in={false}><div id='child' /></FadeTransition>
  )

  expect(wrapper).toMatchSnapshot()
})
