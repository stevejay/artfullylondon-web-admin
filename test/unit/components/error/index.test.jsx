import React from 'react'
import { shallow } from 'enzyme'

import Error from '_admin/components/error'

it('should render a 500 error correctly', () => {
  const wrapper = shallow(<Error statusCode={500} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a 404 error correctly', () => {
  const wrapper = shallow(<Error statusCode={404} />)
  expect(wrapper).toMatchSnapshot()
})
