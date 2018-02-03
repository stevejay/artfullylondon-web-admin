import React from 'react'
import { mount } from 'enzyme'

import DropdownTransition from '_src/components/dropdown/transition'

it('should render correctly', () => {
  const wrapper = mount(
    <DropdownTransition><div id='child' /></DropdownTransition>
  )

  expect(wrapper).toMatchSnapshot()
})
