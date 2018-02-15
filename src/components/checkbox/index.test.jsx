import React from 'react'
import _ from 'lodash'

import Checkbox from '_src/components/checkbox'

it('should render correctly when checked', () => {
  const wrapper = shallow(
    <Checkbox checked error={null} touched={false} onChange={_.noop}>
      <div id='child' />
    </Checkbox>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not checked', () => {
  const wrapper = shallow(
    <Checkbox checked={false} error={null} touched={false} onChange={_.noop}>
      <div id='child' />
    </Checkbox>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an error', () => {
  const wrapper = shallow(
    <Checkbox checked error='The Error' touched onChange={_.noop}>
      <div id='child' />
    </Checkbox>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <Checkbox checked error={null} touched={false} onChange={_.noop}>
      <div id='child' />
    </Checkbox>
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ checked: true, error: null, touched: false })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <Checkbox checked error={null} touched={false} onChange={_.noop}>
      <div id='child' />
    </Checkbox>
  )

  const result = wrapper
    .instance()
    .shouldComponentUpdate({ checked: true, error: null, touched: true })

  expect(result).toEqual(true)
})
