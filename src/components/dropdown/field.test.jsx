import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownField from '_src/components/dropdown/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DropdownField
      input={{
        value: 'the value',
        onChange: _.noop
      }}
      items={[{ label: 'a' }, { label: 'b' }]}
      compact
    />
  )

  expect(wrapper).toMatchSnapshot()
})
