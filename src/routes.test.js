import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { actions as referenceActions } from '_src/modules/reference-data'
import { actions as userActions } from '_src/modules/user'
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

  expect(mockDispatch.mock.calls.length).toEqual(2)

  expect(mockDispatch.mock.calls[0]).toEqual([userActions.attemptAutoLogIn()])

  expect(mockDispatch.mock.calls[1]).toEqual([
    referenceActions.fetchReferenceData()
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
