import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Checkbox from '_admin/components/checkbox'

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
