import React from 'react'
import _ from 'lodash'

import { ImageCarousel } from './image-carousel'
import ImageGallery from 'react-image-gallery'

it('should render correctly', () => {
  const wrapper = shallow(
    <ImageCarousel
      images={[
        {
          original: 'some-id',
          ratio: 2,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        }
      ]}
      currentIndex={0}
      setCurrentIndex={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when mounted', () => {
  const wrapper = mount(
    <ImageCarousel
      images={[
        {
          original: 'image-0',
          ratio: 1,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        },
        {
          original: 'image-1',
          ratio: 2,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        },
        {
          original: 'image-2',
          ratio: 3,
          copyright: 'The Copyright'
        }
      ]}
      currentIndex={1}
      setCurrentIndex={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a slide event', () => {
  const setCurrentIndex = jest.fn()

  const wrapper = shallow(
    <ImageCarousel
      images={[
        {
          original: 'some-id',
          ratio: 2,
          copyright: 'The Copyright',
          dominantColor: 'AAAAAA'
        }
      ]}
      currentIndex={0}
      setCurrentIndex={setCurrentIndex}
    />
  )

  wrapper.find(ImageGallery).prop('onSlide')(2)

  expect(setCurrentIndex).toHaveBeenCalledWith(2)
})
