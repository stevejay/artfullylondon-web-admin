import React from 'react'

import ImageGridImage from './image-grid-image'

it('should render correctly when has an image id', () => {
  const wrapper = shallow(
    <ImageGridImage imageId='image-id' type='venue' size='small' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no image id', () => {
  const wrapper = shallow(<ImageGridImage type='venue' size='small' />)
  expect(wrapper).toMatchSnapshot()
})
