import React from 'react'

import Error from './index'
import errorType from '_src/domain/types/error-type'

it('should render a 500 error correctly', () => {
  const wrapper = shallow(<Error />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a 404 error correctly', () => {
  const wrapper = shallow(<Error type={errorType.NOT_FOUND} />)
  expect(wrapper).toMatchSnapshot()
})
