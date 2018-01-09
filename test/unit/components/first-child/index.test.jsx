import React from 'react'
import { shallow } from 'enzyme'

import FirstChild from '_admin/components/first-child'

it('should render only first child of array', () => {
  const wrapper = shallow(<FirstChild><div id='1' /><div id='2' /></FirstChild>)

  expect(wrapper).toMatchSnapshot()
})

it('should render only first child of single', () => {
  const wrapper = shallow(<FirstChild><div id='1' /></FirstChild>)
  expect(wrapper).toMatchSnapshot()
})

it('should handle no children', () => {
  const wrapper = shallow(<FirstChild />)
  expect(wrapper).toMatchSnapshot()
})
