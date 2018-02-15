import React from 'react'

import Error from './error'
import * as errorConstants from '../constants'

it('should render a 500 error correctly', () => {
  const wrapper = shallow(<Error />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a 404 error correctly', () => {
  const wrapper = shallow(<Error type={errorConstants.NOT_FOUND} />)
  expect(wrapper).toMatchSnapshot()
})
