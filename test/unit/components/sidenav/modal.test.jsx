import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SidenavModal from '_src/components/sidenav/modal'

it('should render correctly when showing', () => {
  const wrapper = shallow(
    <SidenavModal show onHide={_.noop}><div id='child' /></SidenavModal>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing', () => {
  const wrapper = shallow(
    <SidenavModal show={false} onHide={_.noop}><div id='child' /></SidenavModal>
  )

  expect(wrapper).toMatchSnapshot()
})
