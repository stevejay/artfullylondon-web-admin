import React from 'react'
import { shallow } from 'enzyme'

import { Image } from '_src/components/image-grid/image'

it('should render correctly when has an image id', () => {
  const wrapper = shallow(
    <Image imageId='image-id' type='venue' size='small' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no image id', () => {
  const wrapper = shallow(<Image type='venue' size='small' />)
  expect(wrapper).toMatchSnapshot()
})
