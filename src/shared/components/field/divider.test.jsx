import React from 'react'

import FieldDivider from '_src/shared/components/field/divider'

it('should render correctly', () => {
  const wrapper = shallow(<FieldDivider />)
  expect(wrapper).toMatchSnapshot()
})
