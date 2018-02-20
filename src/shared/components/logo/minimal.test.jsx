import React from 'react'

import MinimalLogo from '_src/shared/components/logo/minimal'

it('should render correctly', () => {
  const wrapper = shallow(<MinimalLogo />)
  expect(wrapper).toMatchSnapshot()
})

it('should never update', () => {
  const wrapper = shallow(<MinimalLogo />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
