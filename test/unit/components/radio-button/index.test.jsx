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
