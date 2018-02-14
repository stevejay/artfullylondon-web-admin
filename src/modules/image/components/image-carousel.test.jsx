import React from 'react'
import { shallow } from 'enzyme'

import ImageCarousel from './image-carousel'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImageCarousel
      images={[
        {
          id: 'some-id',
          ratio: 2,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        }
      ]}
    />
  )

  expect(wrapper).toMatchSnapshot()
})