import React from 'react'
import _ from 'lodash'

import Step from '_src/shared/components/step'

it('should render correctly when showing step way before current step', () => {
  const wrapper = shallow(
    <Step title='The Title' page={1} currentPage={5} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing step before current step', () => {
  const wrapper = shallow(
    <Step title='The Title' page={1} currentPage={2} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing current step', () => {
  const wrapper = shallow(
    <Step title='The Title' page={2} currentPage={2} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing step after current step', () => {
  const wrapper = shallow(
    <Step title='The Title' page={3} currentPage={2} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when showing step way after current step', () => {
  const wrapper = shallow(
    <Step title='The Title' page={6} currentPage={2} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a step being clicked', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <Step title='The Title' page={1} currentPage={5} onClick={handleClick} />
  )

  wrapper.find('li').simulate('click')

  expect(handleClick).toHaveBeenCalledWith(1)
})
