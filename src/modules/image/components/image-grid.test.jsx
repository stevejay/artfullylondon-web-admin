import React from 'react'

import ImageGrid from '_src/modules/image/components/image-grid'

it('should render correctly when has children', () => {
  const wrapper = shallow(<ImageGrid><div id='child' /></ImageGrid>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no children', () => {
  const wrapper = shallow(<ImageGrid />)
  expect(wrapper).toMatchSnapshot()
})
