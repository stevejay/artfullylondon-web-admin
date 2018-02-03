import React from 'react'
import { shallow } from 'enzyme'

import ModalTransition from '_src/modules/sidenav/components/modal-transition'

it('should render correctly', () => {
  const wrapper = shallow(<ModalTransition><div id='child' /></ModalTransition>)
  expect(wrapper).toMatchSnapshot()
})
