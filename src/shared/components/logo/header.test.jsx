import React from 'react'

import HeaderLogo from '_src/shared/components/logo/header'

it('should render a small header logo correctly', () => {
  const wrapper = shallow(<HeaderLogo size='small' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a medium header logo correctly', () => {
  const wrapper = shallow(<HeaderLogo size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(<HeaderLogo size='medium' />)
  const result = wrapper.instance().shouldComponentUpdate({ size: 'medium' })
  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(<HeaderLogo size='medium' />)
  const result = wrapper.instance().shouldComponentUpdate({ size: 'small' })
  expect(result).toEqual(true)
})
