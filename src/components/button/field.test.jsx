import React from 'react'
import _ from 'lodash'

import ButtonField from '_src/components/button/field'

it('should render correctly', () => {
  const wrapper = shallow(<ButtonField label='The Label' onClick={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when submitting', () => {
  const wrapper = shallow(
    <ButtonField label='The Label' onClick={_.noop} submitting />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(
    <ButtonField label='The Label' onClick={_.noop} disabled />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(
    <ButtonField label='The Label' onClick={_.noop} disabled />
  )

  const result = wrapper.instance().shouldComponentUpdate({ disabled: true })

  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(
    <ButtonField label='The Label' onClick={_.noop} disabled />
  )

  const result = wrapper.instance().shouldComponentUpdate({ disabled: false })

  expect(result).toEqual(true)
})
