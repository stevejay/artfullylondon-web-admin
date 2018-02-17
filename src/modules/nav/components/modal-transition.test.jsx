import React from 'react'

import ModalTransition from './modal-transition'

it('should render correctly', () => {
  const wrapper = shallow(<ModalTransition><div id='child' /></ModalTransition>)
  expect(wrapper).toMatchSnapshot()
})
