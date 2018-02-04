import React from 'react'
import { shallow } from 'enzyme'

import FormHeading from '_src/components/form/heading'

it('should render correctly', () => {
  const wrapper = shallow(<FormHeading> <div id='child' /></FormHeading>)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<FormHeading> <div id='child' /></FormHeading>)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
