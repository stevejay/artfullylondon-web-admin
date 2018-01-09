import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import DropdownField from '_src/components/dropdown/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <DropdownField
      input={{
        value: 'term',
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      options={[{ value: 'a', label: 'A' }]}
      label='The Label'
      required={false}
      disabled={false}
      searchable={false}
      multi={false}
      simpleValue={false}
      valueKey='value'
      labelKey='label'
      htmlId={'some-id'}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
