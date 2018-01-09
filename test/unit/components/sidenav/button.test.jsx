import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SidenavButton from '_admin/components/sidenav/button'

it('should render correctly', () => {
  const wrapper = shallow(
    <SidenavButton
      label='The Label'
      onClick={_.noop}
      onKeyDown={_.noop}
      onKeyPress={_.noop}
      onFocus={_.noop}
      onBlur={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
