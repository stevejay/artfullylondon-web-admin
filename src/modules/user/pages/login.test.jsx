import React from 'react'
import _ from 'lodash'

import { LoginPage } from './login'
import LoginForm from '../forms/login'
import * as userActions from '../actions'

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

  expect(dispatch).toHaveBeenCalledWith(userActions.logIn({ name: 'foo' }))
})
