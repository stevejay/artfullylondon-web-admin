import React from 'react'
import _ from 'lodash'

import Dropdown from '_src/components/dropdown'

it('should render correctly', () => {
  const wrapper = shallow(
    <Dropdown
      value='a'
      items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
      compact
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
