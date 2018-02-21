import React from 'react'
import _ from 'lodash'

import { actions as referenceActions } from '_src/modules/reference-data'
import { actions as userActions } from '_src/modules/user'
import { Routes } from '_src/routes'
import { Header, Sidenav } from '_src/modules/nav'
import { Quicksearch } from '_src/modules/search'

it('should render correctly when auto login not yet attempted', () => {
  const wrapper = shallow(
    <Routes
      loggedIn={false}
      autoLogInAttempted={false}
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
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
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
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
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when logged in and showing quicksearch', () => {
  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when logged in and showing sidenav', () => {
  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should trigger the initial actions', () => {
  const mockDispatch = jest.fn()

  shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={mockDispatch}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  expect(mockDispatch).toHaveBeenCalledWith(userActions.attemptAutoLogIn())

  expect(mockDispatch).toHaveBeenCalledWith(
    referenceActions.fetchReferenceData()
  )
})

it('should handle showing the quicksearch', () => {
  const showQuicksearch = jest.fn()

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={showQuicksearch}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  wrapper.find(Header).prop('onShowQuicksearch')()

  expect(showQuicksearch).toHaveBeenCalled()
})

it('should handle hiding the quicksearch', () => {
  const hideQuicksearch = jest.fn()

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={hideQuicksearch}
      showSidenav={_.noop}
      hideSidenav={_.noop}
    />
  )

  wrapper.find(Quicksearch).prop('onHide')()

  expect(hideQuicksearch).toHaveBeenCalled()
})

it('should handle showing the sidenav', () => {
  const showSidenav = jest.fn()

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav={false}
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={showSidenav}
      hideSidenav={_.noop}
    />
  )

  wrapper.find(Header).prop('onShowSidenav')()

  expect(showSidenav).toHaveBeenCalled()
})

it('should handle hiding the sidenav', () => {
  const hideSidenav = jest.fn()

  const wrapper = shallow(
    <Routes
      loggedIn
      autoLogInAttempted
      dispatch={_.noop}
      location={{ pathname: '/some/path' }}
      showingQuicksearch={false}
      showingSidenav
      showQuicksearch={_.noop}
      hideQuicksearch={_.noop}
      showSidenav={_.noop}
      hideSidenav={hideSidenav}
    />
  )

  wrapper.find(Sidenav).prop('onHide')()

  expect(hideSidenav).toHaveBeenCalled()
})
