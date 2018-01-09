import React from 'react'
import { shallow } from 'enzyme'

import FormError from '_admin/components/form/error'
import { GENERIC_ERROR_MESSAGE } from '_admin/constants/validation'

it('should render correctly when there is no error', () => {
  const wrapper = shallow(<FormError />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is an error', () => {
  const wrapper = shallow(<FormError error='The error' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a generic error and they are to be hidden', () => {
  const wrapper = shallow(
    <FormError error={GENERIC_ERROR_MESSAGE} hideGenericErrorMessages />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a generic error and they are not to be hidden', () => {
  const wrapper = shallow(
    <FormError error={GENERIC_ERROR_MESSAGE} hideGenericErrorMessages={false} />
  )

  expect(wrapper).toMatchSnapshot()
})
