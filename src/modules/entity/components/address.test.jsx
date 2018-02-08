import React from 'react'
import { shallow } from 'enzyme'

import EntityAddress from './address'

it('should render correctly', () => {
  const wrapper = shallow(<EntityAddress fullAddress='26 Foo Street, Bar' />)
  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(<EntityAddress fullAddress='26 Foo Street, Bar' />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
