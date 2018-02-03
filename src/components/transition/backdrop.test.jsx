import React from 'react'
import { mount } from 'enzyme'

import BackdropTransition from '_src/components/transition/backdrop'

it('should render correctly', () => {
  const wrapper = mount(
    <BackdropTransition><div id='child' /></BackdropTransition>
  )

  expect(wrapper).toMatchSnapshot()
})
