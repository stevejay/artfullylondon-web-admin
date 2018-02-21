import React from 'react'
import _ from 'lodash'

import SidenavMenuLink from './sidenav-menu-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <SidenavMenuLink path='/some/path' label='The Label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
