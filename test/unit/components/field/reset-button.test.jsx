import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import FieldResetButton from '_admin/components/field/reset-button'

it('should render correctly', () => {
  const wrapper = shallow(
    <FieldResetButton disabled={false} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when disabled', () => {
  const wrapper = shallow(<FieldResetButton disabled onClick={_.noop} />)
  expect(wrapper).toMatchSnapshot()
})
