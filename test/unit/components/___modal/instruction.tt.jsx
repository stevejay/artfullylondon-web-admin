import React from 'react'
import { shallow } from 'enzyme'

import ModalInstruction from '_src/components/modal/instruction'

it('should render a narrow container correctly', () => {
  const wrapper = shallow(
    <ModalInstruction><div id='child' /></ModalInstruction>
  )

  expect(wrapper).toMatchSnapshot()
})
