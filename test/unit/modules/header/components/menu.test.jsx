import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import HeaderMenu from '_src/modules/header/components/menu'

it('should render correctly', () => {
  const wrapper = shallow(
    <HeaderMenu
      style={{ top: 10 }}
      items={[
        { label: 'Label A', path: '/path-a' },
        { label: 'Label B', path: '/path-b' }
      ]}
      selectedIndex={1}
      onMouseDown={_.noop}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
