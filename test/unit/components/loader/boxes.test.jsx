import React from 'react'
import { shallow } from 'enzyme'

import BoxesLoader from '_src/components/loader/boxes'

it('should render a default loader correctly', () => {
  const wrapper = shallow(<BoxesLoader />)
  expect(wrapper).toMatchSnapshot()
})

it('should never update', () => {
  const wrapper = shallow(<BoxesLoader />)
  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
