import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import log from 'loglevel'

import { Header } from '_src/modules/header/components/header'
import Button from '_src/components/button'
import { actions as userActions } from '_src/modules/user'

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  log.error = jest.fn()

  const wrapper = shallow(
    <Header
      hasError
      loggedIn
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should update state when an error has been caught', () => {
  log.error = jest.fn()
  const setHasError = jest.fn()

  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
      setHasError={setHasError}
    />
  )

  wrapper.instance().componentDidCatch({}, {})

  expect(setHasError).toHaveBeenCalledWith(true)
  expect(log.error).toHaveBeenCalled()
})

it('should render correctly when showing the sidenav', () => {
  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      showingSidenav
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
      setHasError={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a logout button click', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={dispatch}
      setHasError={_.noop}
    />
  )

  wrapper.find(Button).at(0).simulate('click')

  expect(dispatch).toHaveBeenCalledWith(userActions.logOut())
})
