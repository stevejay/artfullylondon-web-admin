import React from 'react'
import { shallow } from 'enzyme'

import Error from '_src/components/error'
import * as errorConstants from '_src/constants/error'

it('should render a 500 error correctly', () => {
  const wrapper = shallow(<Error />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a 404 error correctly', () => {
  const wrapper = shallow(<Error type={errorConstants.NOT_FOUND} />)
  expect(wrapper).toMatchSnapshot()
})
