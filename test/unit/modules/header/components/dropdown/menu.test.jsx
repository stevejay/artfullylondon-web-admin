import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownMenu from '_src/modules/header/components/dropdown/menu'

it('should render correctly', () => {
  const wrapper = shallow(
    <DropdownMenu
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
