import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import * as appActionTypes from '_src/constants/action/app'
import * as authActionTypes from '_src/constants/action/auth'
import * as browserActionTypes from '_src/constants/action/browser'
import * as serverConstantsTypes from '_src/constants/action/server-constants'
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

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={mockDispatch}
      location={{ pathname: '/some/path' }}
    />
  )

  expect(mockDispatch.mock.calls.length).toEqual(3)

  expect(mockDispatch.mock.calls[0]).toEqual([
    {
      type: authActionTypes.ATTEMPT_AUTO_LOG_IN
    }
  ])

  expect(mockDispatch.mock.calls[1]).toEqual([
    {
      type: serverConstantsTypes.FETCH_SERVER_CONSTANTS
    }
  ])

  expect(mockDispatch.mock.calls[2]).toEqual([
    {
      type: appActionTypes.CHECK_IF_APP_WAS_UPDATED
    }
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
    {
      type: browserActionTypes.BROWSER_WIDTH_CHANGED,
      payload: { width: 200 }
    }
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
