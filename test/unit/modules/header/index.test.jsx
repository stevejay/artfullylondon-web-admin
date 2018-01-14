import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { Header } from '_src/modules/header'

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Header
      loggedIn
      menus={[
        { label: 'Menu Label', items: [{ label: 'Item A', path: '/path/a' }] }
      ]}
      isWideBrowser
      showingSidenav={false}
      history={{}}
      showSidenav={_.noop}
      showQuicksearch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing the sidenav', () => {
  const wrapper = shallow(
    <Header
      loggedIn
      menus={[
        { label: 'Menu Label', items: [{ label: 'Item A', path: '/path/a' }] }
      ]}
      isWideBrowser
      showingSidenav
      history={{}}
      showSidenav={_.noop}
      showQuicksearch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when narrow', () => {
  const wrapper = shallow(
    <Header
      loggedIn
      menus={[
        { label: 'Menu Label', items: [{ label: 'Item A', path: '/path/a' }] }
      ]}
      isWideBrowser={false}
      showingSidenav={false}
      history={{}}
      showSidenav={_.noop}
      showQuicksearch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not logged in', () => {
  const wrapper = shallow(
    <Header
      loggedIn={false}
      menus={[
        { label: 'Menu Label', items: [{ label: 'Item A', path: '/path/a' }] }
      ]}
      isWideBrowser
      showingSidenav={false}
      history={{}}
      showSidenav={_.noop}
      showQuicksearch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
