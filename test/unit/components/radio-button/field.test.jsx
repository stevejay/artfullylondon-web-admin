import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import RadioButtonField from '_admin/components/radio-button/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <RadioButtonField
      label='The Label'
      input={{
        value: 'id-1',
        name: 'The Name',
        onChange: _.noop
      }}
      options={[
        { id: 'id-1', label: 'Label One' },
        { id: 'id-2', label: 'Label Two' }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
