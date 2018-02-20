import React from 'react'

import Toolbar from '_src/shared/components/toolbar'

it('should render correctly', () => {
  const wrapper = shallow(<Toolbar><div id='child' /></Toolbar>)
  expect(wrapper).toMatchSnapshot()
})
