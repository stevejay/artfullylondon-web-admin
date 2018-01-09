import React from 'react'
import { shallow } from 'enzyme'

import Pusher from '_src/components/pusher'

it('should render correctly', () => {
  const wrapper = shallow(<Pusher />)
  expect(wrapper).toMatchSnapshot()
})
