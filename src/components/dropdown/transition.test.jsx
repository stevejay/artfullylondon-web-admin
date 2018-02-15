import React from 'react'

import DropdownTransition from '_src/components/dropdown/transition'

it('should render correctly', () => {
  const wrapper = mount(
    <DropdownTransition><div id='child' /></DropdownTransition>
  )

  expect(wrapper).toMatchSnapshot()
})
