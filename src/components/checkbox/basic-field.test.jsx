import React from 'react'
import _ from 'lodash'

import CheckboxBasicField from '_src/components/checkbox/basic-field'

it('should render correctly', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly with an error', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: true, error: 'The Error' }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: true },
    meta: { touched: false, error: null }
  })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <CheckboxBasicField
      label='The Label'
      input={{ value: true, onChange: _.noop }}
      meta={{ touched: false, error: null }}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate({
    input: { value: false },
    meta: { touched: false, error: null }
  })

  expect(result).toEqual(true)
})
