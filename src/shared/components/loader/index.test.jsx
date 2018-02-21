import React from 'react'

import Loader from '_src/shared/components/loader'

it('should render a tiny loader correctly', () => {
  const wrapper = shallow(<Loader size='tiny' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a small inverse loader correctly', () => {
  const wrapper = shallow(<Loader size='small' type='inverse' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a medium loader correctly', () => {
  const wrapper = shallow(<Loader size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a large inverse loader correctly', () => {
  const wrapper = shallow(<Loader size='large' type='inverse' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a modal loader correctly', () => {
  const wrapper = shallow(<Loader size='modal' />)
  expect(wrapper).toMatchSnapshot()
})
