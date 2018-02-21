import React from 'react'

import MinimalLogo from '_src/shared/components/logo/minimal'

it('should render correctly', () => {
  const wrapper = shallow(<MinimalLogo />)
  expect(wrapper).toMatchSnapshot()
})
