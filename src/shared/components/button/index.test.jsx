import React from 'react'
import _ from 'lodash'

import Button from '_src/shared/components/button'

it('should render correctly', () => {
  const wrapper = shallow(<Button onClick={_.noop}><div id='child' /></Button>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when submitting', () => {
  const wrapper = shallow(
    <Button onClick={_.noop} submitting><div id='child' /></Button>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <Button onClick={_.noop} disabled><div id='child' /></Button>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <Button onClick={_.noop} disabled><div id='child' /></Button>
  )

  const result = wrapper.instance().shouldComponentUpdate({ disabled: true })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <Button onClick={_.noop} disabled><div id='child' /></Button>
  )

  const result = wrapper.instance().shouldComponentUpdate({ disabled: false })

  expect(result).toEqual(true)
})
