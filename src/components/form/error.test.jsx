import React from 'react'

import FormError from '_src/components/form/error'
import * as globalConstants from '_src/constants'

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
    <FormError
      error={globalConstants.GENERIC_ERROR_MESSAGE}
      hideGenericErrorMessages
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is a generic error and they are not to be hidden', () => {
  const wrapper = shallow(
    <FormError
      error={globalConstants.GENERIC_ERROR_MESSAGE}
      hideGenericErrorMessages={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
