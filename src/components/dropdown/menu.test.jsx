import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownMenu from '_src/components/dropdown/menu'

it('should render correctly when is compact', () => {
  const wrapper = shallow(
    <DropdownMenu
      items={[{ label: 'a' }, { label: 'b' }]}
      selectedIndex={1}
      compact
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is not compact', () => {
  const wrapper = shallow(
    <DropdownMenu
      items={[{ label: 'a' }, { label: 'b' }]}
      selectedIndex={1}
      compact={false}
      onMouseEnter={_.noop}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
