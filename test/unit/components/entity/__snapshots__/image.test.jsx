import React from 'react'
import { shallow } from 'enzyme'

import EntityImage from '_src/components/entity/image'

it('should render correctly when showing the carousel', () => {
  const wrapper = shallow(
    <EntityImage
      entityType='venue'
      images={[{ id: 'some-id', ratio: 2 }]}
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
