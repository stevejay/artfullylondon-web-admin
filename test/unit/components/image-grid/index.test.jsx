import React from 'react'
import { shallow } from 'enzyme'

import ImageGrid from '_src/components/image-grid'

it('should render correctly when has children', () => {
  const wrapper = shallow(<ImageGrid><div id='child' /></ImageGrid>)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no children', () => {
  const wrapper = shallow(<ImageGrid />)
  expect(wrapper).toMatchSnapshot()
})
