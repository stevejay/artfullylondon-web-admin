import React from 'react'
import { shallow } from 'enzyme'

import { ImageGridImage } from '_src/modules/image/components/image-grid-image'

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
