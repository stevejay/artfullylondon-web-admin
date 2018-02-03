import React from 'react'
import { shallow } from 'enzyme'

import Logo from '_src/components/logo'

it('should render a small normal logo correctly', () => {
  const wrapper = shallow(<Logo size='small' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a medium normal logo correctly', () => {
  const wrapper = shallow(<Logo size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a large inverse logo correctly', () => {
  const wrapper = shallow(<Logo type='inverse' size='large' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render an extra large inverse logo correctly', () => {
  const wrapper = shallow(<Logo type='inverse' size='xlarge' />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update when props have not changed', () => {
  const wrapper = shallow(<Logo size='medium' />)
  const result = wrapper.instance().shouldComponentUpdate({ size: 'medium' })
  expect(result).toEqual(false)
})

it('should update when props have changed', () => {
  const wrapper = shallow(<Logo size='medium' />)
  const result = wrapper.instance().shouldComponentUpdate({ size: 'small' })
  expect(result).toEqual(true)
})
