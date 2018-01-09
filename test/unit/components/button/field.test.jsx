import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import ButtonField from '_admin/components/button/field'

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
