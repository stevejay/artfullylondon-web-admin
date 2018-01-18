import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import log from 'loglevel'

import ModalTransition from '_src/modules/sidenav/components/modal-transition'

it('should render correctly', () => {
  const wrapper = shallow(<ModalTransition><div id='child' /></ModalTransition>)
  expect(wrapper).toMatchSnapshot()
})
