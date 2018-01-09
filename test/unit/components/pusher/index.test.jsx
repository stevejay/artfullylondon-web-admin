import React from 'react'
import { shallow } from 'enzyme'

import Pusher from '_admin/components/pusher'

it('should render correctly', () => {
  const wrapper = shallow(<Pusher />)
  expect(wrapper).toMatchSnapshot()
})
