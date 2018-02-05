import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import log from 'loglevel'

import { Header } from '_src/modules/header'
import Button from '_src/components/button'
import { authActions } from '_src/store'

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      isWideBrowser
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
      isWideBrowser
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
      isWideBrowser
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
      isWideBrowser
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

it('should render correctly when narrow', () => {
  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      isWideBrowser={false}
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

it('should handle a logout button click when wide', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Header
      hasError={false}
      loggedIn
      isWideBrowser
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={dispatch}
      setHasError={_.noop}
    />
  )

  wrapper.find(Button).at(0).simulate('click')

  expect(dispatch).toHaveBeenCalledWith(authActions.logOut())
})
