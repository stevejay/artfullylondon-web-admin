import React from 'react'
import { shallow } from 'enzyme'

import FieldError from '_admin/components/field/error'

it('should render correctly when there is an error', () => {
  const wrapper = shallow(<FieldError error='The Error' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no error', () => {
  const wrapper = shallow(<FieldError />)
  expect(wrapper).toMatchSnapshot()
})
