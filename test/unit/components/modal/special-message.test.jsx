import React from 'react'
import { shallow } from 'enzyme'

import ModalSpecialMessage from '_src/components/modal/special-message'

it('should render correctly', () => {
  const wrapper = shallow(<ModalSpecialMessage message='The Message' />)
  expect(wrapper).toMatchSnapshot()
})
