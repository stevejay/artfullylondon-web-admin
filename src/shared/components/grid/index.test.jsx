import React from 'react'

import Grid from '_src/shared/components/grid'

it('should render correctly when has children', () => {
  const wrapper = shallow(<Grid><div id='child' /></Grid>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no children', () => {
  const wrapper = shallow(<Grid />)
  expect(wrapper).toMatchSnapshot()
})
