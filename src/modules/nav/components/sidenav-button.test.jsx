import React from 'react'
import _ from 'lodash'

import SidenavButton from './sidenav-button'

it('should render correctly', () => {
  const wrapper = shallow(<SidenavButton label='The Label' onClick={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})