import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SelectField from '_src/components/select/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <SelectField
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
