import React from 'react'

import ModalTransition
  from '_src/modules/search/components/quicksearch/modal-transition'

it('should render correctly', () => {
  const wrapper = mount(<ModalTransition><div id='child' /></ModalTransition>)
  expect(wrapper).toMatchSnapshot()
})
