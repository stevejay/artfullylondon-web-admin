import React from 'react'
import { shallow } from 'enzyme'

import FieldDivider from '_admin/components/field/divider'

it('should render correctly', () => {
  const wrapper = shallow(<FieldDivider />)
  expect(wrapper).toMatchSnapshot()
})
