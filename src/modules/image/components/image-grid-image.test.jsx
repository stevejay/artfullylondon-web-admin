import React from 'react'

import ImageGridImage from './image-grid-image'
import entityType from '_src/domain/types/entity-type'

it('should render correctly when has an image id', () => {
  const wrapper = shallow(
    <ImageGridImage imageId='image-id' type={entityType.VENUE} size='small' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no image id', () => {
  const wrapper = shallow(<ImageGridImage type={entityType.VENUE} size='small' />)
  expect(wrapper).toMatchSnapshot()
})
