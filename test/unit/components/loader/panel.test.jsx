import React from 'react'
import { shallow } from 'enzyme'

import LoaderPanel from '_src/components/loader/panel'

it('should render a tiny default loader panel correctly', () => {
  const wrapper = shallow(<LoaderPanel size='tiny' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a medium inverse loader panel correctly', () => {
  const wrapper = shallow(<LoaderPanel size='medium' type='inverse' />)
  expect(wrapper).toMatchSnapshot()
})
