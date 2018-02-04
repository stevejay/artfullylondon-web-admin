import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import RadioButton from '_src/components/radio-button'

it('should render correctly when checked', () => {
  const wrapper = shallow(
    <RadioButton
      checked
      value='the-value'
      label='The Label'
      name='the-name'
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not checked', () => {
  const wrapper = shallow(
    <RadioButton
      checked={false}
      value='the-value'
      label='The Label'
      name='the-name'
      onChange={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

describe('shouldComponentUpate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <RadioButton
        checked
        value='the-value'
        label='The Label'
        name='the-name'
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({ checked: true })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <RadioButton
        checked
        value='the-value'
        label='The Label'
        name='the-name'
        onChange={_.noop}
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({ checked: false })

    expect(result).toEqual(true)
  })
})

it('should handle the checkbox being changed', () => {
  const handleChange = jest.fn()

  const wrapper = shallow(
    <RadioButton
      checked
      value='the-value'
      label='The Label'
      name='the-name'
      onChange={handleChange}
    />
  )

  wrapper.find('input').simulate('change')

  expect(handleChange).toHaveBeenCalledWith('the-value')
})
