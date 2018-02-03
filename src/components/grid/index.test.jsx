import React from 'react'
import { shallow } from 'enzyme'

import Grid from '_src/components/grid'

it('should render correctly when has children', () => {
  const wrapper = shallow(<Grid><div id='child' /></Grid>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no children', () => {
  const wrapper = shallow(<Grid />)
  expect(wrapper).toMatchSnapshot()
})