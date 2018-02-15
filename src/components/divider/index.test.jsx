import React from 'react'

import Divider from '_src/components/divider'

it('should render a default divider correctly', () => {
  const wrapper = shallow(<Divider />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a hidden divider correctly', () => {
  const wrapper = shallow(<Divider type='hidden' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a threedee divider correctly', () => {
  const wrapper = shallow(<Divider type='threedee' />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<Divider />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
