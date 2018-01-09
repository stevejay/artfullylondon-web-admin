import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Button from '_admin/components/button'

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
