import React from 'react'
import { shallow } from 'enzyme'

import Message from '_src/components/message'

it('should render an info message correctly', () => {
  const wrapper = shallow(
    <Message type='info' title='The Title' linkTo='/link/to'>
      <div id='child' />
    </Message>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a success message correctly', () => {
  const wrapper = shallow(
    <Message type='success' title='The Title' linkTo='/link/to'>
      <div id='child' />
    </Message>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an error message correctly', () => {
  const wrapper = shallow(
    <Message type='error' title='The Title' linkTo='/link/to'>
      <div id='child' />
    </Message>
  )

  expect(wrapper).toMatchSnapshot()
})