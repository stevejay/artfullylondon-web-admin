import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CheckboxBasicField from '_admin/components/checkbox/basic-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: true,
        error: 'The Error'
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
