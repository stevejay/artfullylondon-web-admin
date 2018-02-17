import React from 'react'

import EntityImage from './image'

it('should render correctly when showing the carousel', () => {
  const wrapper = shallow(
    <EntityImage
      entityType='venue'
      images={[
        {
          id: 'some-id',
          ratio: 2,
          copyright: 'Some copyright',
          dominantColor: 'AAAAAA'
        }
      ]}
      showCarousel
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when not showing the carousel', () => {
  const wrapper = shallow(
    <EntityImage
      entityType='venue'
      images={[{ id: 'some-id', ratio: 2 }]}
      showCarousel={false}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there are no images', () => {
  const wrapper = shallow(
    <EntityImage entityType='venue' images={[]} showCarousel />
  )

  expect(wrapper).toMatchSnapshot()
})
