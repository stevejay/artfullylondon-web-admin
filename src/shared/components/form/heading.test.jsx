import React from 'react'

import FormHeading from '_src/shared/components/form/heading'

it('should render correctly', () => {
  const wrapper = shallow(<FormHeading> <div id='child' /></FormHeading>)
  expect(wrapper).toMatchSnapshot()
})
