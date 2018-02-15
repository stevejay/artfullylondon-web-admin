import React from 'react'

import FieldError from '_src/components/field/error'

it('should render correctly when there is an error', () => {
  const wrapper = shallow(<FieldError error='The Error' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are multiple errors', () => {
  const wrapper = shallow(<FieldError error={['Error One', 'Error Two']} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no error', () => {
  const wrapper = shallow(<FieldError />)
  expect(wrapper).toMatchSnapshot()
})
