import React from 'react'
import _ from 'lodash'

import DropdownMenu from '_src/shared/components/dropdown/menu'

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