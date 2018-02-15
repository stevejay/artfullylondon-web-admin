import React from 'react'
import _ from 'lodash'

import CheckboxField from '_src/components/checkbox/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
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
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: true, error: 'The Error' }}
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
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
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
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled={false}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: true },
    meta: { touched: false, error: null },
    disabled: false
  })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <CheckboxField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
      checkboxLabel='The Checkbox Label'
      required={false}
      disabled={false}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: false },
    meta: { touched: false, error: null },
    disabled: false
  })

  expect(result).toEqual(true)
})
