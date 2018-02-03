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
      loggedIn
      isWideBrowser
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  log.error = jest.fn()

  const wrapper = shallow(
    <Header
      loggedIn
      isWideBrowser
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
    />
  )

  wrapper.instance().componentDidCatch({}, {})

  expect(wrapper.state().hasError).toEqual(true)
  wrapper.update() // TODO remove when enzyme bug fixed
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing the sidenav', () => {
  const wrapper = shallow(
    <Header
      loggedIn
      isWideBrowser
      showingSidenav
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when narrow', () => {
  const wrapper = shallow(
    <Header
      loggedIn
      isWideBrowser={false}
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a logout button click when wide', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <Header
      loggedIn
      isWideBrowser
      showingSidenav={false}
      history={{}}
      onShowSidenav={_.noop}
      onShowQuicksearch={_.noop}
      dispatch={dispatch}
    />
  )

  wrapper.find(Button).at(0).simulate('click')

  expect(dispatch).toHaveBeenCalledWith(authActions.logOut())
})
