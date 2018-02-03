import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import {
  appActions,
  authActions,
  browserActions,
  serverConstantActions
} from '_src/store'
import { Routes } from '_src/routes'

it('should render correctly when auto login not yet attempted', () => {
  const wrapper = shallow(
    <Routes
      loggedIn={false}
      autoLogInAttempted={false}
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not logged in', () => {
  const wrapper = shallow(
    <Routes
      loggedIn={false}
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger initial actions', () => {
  const mockDispatch = jest.fn()

  shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={mockDispatch}
      location={{ pathname: '/some/path' }}
    />
  )

  expect(mockDispatch.mock.calls.length).toEqual(3)

  expect(mockDispatch.mock.calls[0]).toEqual([authActions.attemptAutoLogIn()])

  expect(mockDispatch.mock.calls[1]).toEqual([
    serverConstantActions.fetchServerConstants()
  ])

  expect(mockDispatch.mock.calls[2]).toEqual([
    appActions.checkIfAppWasUpdated()
  ])
})

it('should handle a window resize event', () => {
  const mockDispatch = jest.fn()

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={mockDispatch}
      location={{ pathname: '/some/path' }}
    />
  )

  wrapper.find('BrowserResizeListener').prop('onWindowResize')(200)

  expect(mockDispatch.mock.calls.length).toEqual(4)

  expect(mockDispatch.mock.calls[3]).toEqual([
    browserActions.browserWidthChanged(200)
  ])
})

it('should hide and show the quicksearch', () => {
  const wrapper = shallow(
    <Routes
      loggedIn={false}
      autoLogInAttempted={false}
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
    />
  )

  wrapper.instance().handleHideQuicksearch()
  expect(wrapper.state().showQuicksearch).toEqual(false)

  wrapper.instance().handleShowQuicksearch()
  expect(wrapper.state().showQuicksearch).toEqual(true)
})

it('should hide and show the sidenav', () => {
  const wrapper = shallow(
    <Routes
      loggedIn={false}
      autoLogInAttempted={false}
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
    />
  )

  wrapper.instance().handleHideSidenav()
  expect(wrapper.state().showSidenav).toEqual(false)

  wrapper.instance().handleShowSidenav()
  expect(wrapper.state().showSidenav).toEqual(true)
})
