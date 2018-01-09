import React from 'react'
import { shallow } from 'enzyme'

import FormHeading from '_admin/components/form/heading'

it('should render correctly', () => {
  const wrapper = shallow(<FormHeading> <div id='child' /></FormHeading>)
  expect(wrapper).toMatchSnapshot()
})
