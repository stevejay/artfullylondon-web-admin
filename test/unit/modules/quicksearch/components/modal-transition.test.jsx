import React from 'react'
import { mount } from 'enzyme'

import ModalTransition
  from '_src/modules/quicksearch/components/modal-transition'

it('should render correctly', () => {
  const wrapper = mount(<ModalTransition><div id='child' /></ModalTransition>)
  expect(wrapper).toMatchSnapshot()
})
