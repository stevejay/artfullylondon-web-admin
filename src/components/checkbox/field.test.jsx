import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import CheckboxField from '_src/components/checkbox/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: true,
        error: 'The Error'
      }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when required', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      checkboxLabel='The Checkbox Label'
      required
      disabled={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{
        value: true,
        onChange: _.noop
      }}
      meta={{
        touched: false,
        error: null
      }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled
    />
  )

  expect(wrapper).toMatchSnapshot()
})
