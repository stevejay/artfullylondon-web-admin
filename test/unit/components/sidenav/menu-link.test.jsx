import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import MenuLink from '_src/components/sidenav/menu-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <MenuLink path='/the/path' label='The Label' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
