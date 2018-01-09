import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SidenavMenu from '_src/components/sidenav/menu'

it('should render correctly when not open', () => {
  const wrapper = shallow(
    <SidenavMenu
      id='some-id'
      idOfOpenMenu='other-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[{ label: 'a', path: '/a' }]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is open', () => {
  const wrapper = shallow(
    <SidenavMenu
      id='some-id'
      idOfOpenMenu='some-id'
      label='The Label'
      onExpanderChange={_.noop}
      onLinkClick={_.noop}
      items={[{ label: 'a', path: '/a' }]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
