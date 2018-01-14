import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import HeaderMenuLink from '_src/modules/header/components/menu-link'

it('should render a small header logo correctly', () => {
  const wrapper = shallow(
    <HeaderMenuLink
      label='The Label'
      index={3}
      to='/to/path'
      selected
      onMouseDown={_.noop}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
