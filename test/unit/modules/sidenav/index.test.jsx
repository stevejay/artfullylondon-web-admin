import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { Sidenav } from '_src/modules/sidenav'

const MENUS = [
  {
    label: 'Menu Label',
    items: [{ label: 'Item A', path: '/path/a', match: /foo/ }]
  }
]

it('should render correctly when logged in', () => {
  const wrapper = shallow(
    <Sidenav
      show
      menus={MENUS}
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing', () => {
  const wrapper = shallow(
    <Sidenav
      show={false}
      menus={MENUS}
      pathname='/some/path'
      loggedIn
      onHide={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when logged out', () => {
  const wrapper = shallow(
    <Sidenav
      show
      menus={MENUS}
      pathname='/some/path'
      loggedIn={false}
      onHide={_.noop}
      history={{}}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
