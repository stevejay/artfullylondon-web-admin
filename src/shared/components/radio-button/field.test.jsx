import React from 'react'
import _ from 'lodash'

import RadioButtonField from '_src/shared/components/radio-button/field'

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
