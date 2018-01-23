import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { LoginPage } from '_src/modules/auth/pages/login'
import LoginForm from '_src/modules/auth/forms/login'
import * as authActionTypes from '_src/constants/action/auth'

it('should render correctly', () => {
  const wrapper = shallow(
    <LoginPage initialUsername={'steve'} dispatch={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger the login action when the login form is submitted', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <LoginPage initialUsername={'steve'} dispatch={dispatch} />
  )

  wrapper.find(LoginForm).prop('onSubmit')({ name: 'foo' })

  expect(dispatch).toHaveBeenCalledWith({
    type: authActionTypes.LOG_IN,
    payload: { name: 'foo' }
  })
})
