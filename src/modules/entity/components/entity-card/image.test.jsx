import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EntityCardImage from './image'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardImage
      entity={{
        id: 'some-id',
        entityType: 'venue',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2,
        cardImageLoaded: false
      }}
      onImageLoad={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when card image is loaded', () => {
  const wrapper = shallow(
    <EntityCardImage
      entity={{
        id: 'some-id',
        entityType: 'venue',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2,
        cardImageLoaded: true
      }}
      onImageLoad={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no image', () => {
  const wrapper = shallow(
    <EntityCardImage
      entity={{
        id: 'some-id',
        entityType: 'venue',
        url: 'http://some/url'
      }}
      onImageLoad={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle the image load event', () => {
  const handleImageLoad = jest.fn()

  const wrapper = shallow(
    <EntityCardImage
      entity={{
        id: 'some-id',
        entityType: 'venue',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2,
        cardImageLoaded: false
      }}
      onImageLoad={handleImageLoad}
    />
  )

  wrapper.find('img').simulate('load')

  expect(handleImageLoad).toHaveBeenCalledWith({
    id: 'some-id',
    entityType: 'venue'
  })
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardImage
      entity={{
        id: 'some-id',
        entityType: 'venue',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2,
        cardImageLoaded: false
      }}
      onImageLoad={_.noop}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
