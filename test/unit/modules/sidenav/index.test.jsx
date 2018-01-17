import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'
import log from 'loglevel'

import * as menuConstants from '_src/constants/menu'
import { Sidenav } from '_src/modules/sidenav'

const MENU_ID = menuConstants.MENUS[0].label

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing', () => {
  const wrapper = shallow(
    <Sidenav
      show={false}
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when logged out', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn={false}
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should update the component when props change', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate(
    {
      show: false,
      pathname: '/some/path',
      loggedIn: true
    },
    {
      idOfOpenMenu: null,
      hasError: false
    }
  )

  expect(result).toEqual(true)
})

it('should not update the component when props do not change', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate(
    {
      show: true,
      pathname: '/some/path',
      loggedIn: true
    },
    {
      idOfOpenMenu: null,
      hasError: false
    }
  )

  expect(result).toEqual(false)
})

it('should render correctly when has an error', () => {
  log.error = jest.fn()

  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  wrapper.instance().componentDidCatch({}, {})

  expect(wrapper.state().hasError).toEqual(true)
  wrapper.update() // TODO remove when enzyme bug fixed
  expect(wrapper).toMatchSnapshot()
})

it('should handle logging the user out', () => {
  const onHide = jest.fn()
  const logOut = jest.fn()

  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={onHide}
      logOut={logOut}
      history={{}}
    />
  )

  wrapper.find('SidenavButton').prop('onClick')()

  expect(onHide.mock.calls.length).toEqual(1)
  expect(logOut.mock.calls.length).toEqual(1)
})

it('should handle a menu link click', () => {
  const onHide = jest.fn()

  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={onHide}
      logOut={_.noop}
      history={{}}
    />
  )

  wrapper.find('Menu').first().prop('onLinkClick')()

  expect(onHide.mock.calls.length).toEqual(1)
})

it('should handle a menu header click', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  wrapper.find('Menu').first().prop('onExpanderChange')(MENU_ID)

  expect(wrapper.state().idOfOpenMenu).toEqual(MENU_ID)
})

it('should handle two menu header clicks', () => {
  const wrapper = shallow(
    <Sidenav
      show
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      logOut={_.noop}
      history={{}}
    />
  )

  wrapper.find('Menu').first().prop('onExpanderChange')(MENU_ID)
  wrapper.find('Menu').first().prop('onExpanderChange')(MENU_ID)

  expect(wrapper.state().idOfOpenMenu).toEqual(null)
})
