import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Form from '_src/components/form'

it('should render correctly', () => {
  const wrapper = shallow(
    <Form onSubmit={_.noop}>
      <div id='child' />
    </Form>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle being submitted', () => {
  const handleSubmit = jest.fn()
  const stopPropagation = jest.fn()
  const event = { stopPropagation }

  const wrapper = shallow(
    <Form onSubmit={handleSubmit}>
      <div id='child' />
    </Form>
  )

  wrapper.find('form').prop('onSubmit')(event)

  expect(stopPropagation).toHaveBeenCalled()
  expect(handleSubmit).toHaveBeenCalledWith(event)
})
