import React from 'react'

import ImagePlaceholder from './image-placeholder'
import entityType from '_src/domain/types/entity-type'

it('should render a venue placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityType.VENUE} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a talent placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityType.TALENT} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an event placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityType.EVENT} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an event series placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder
      type={entityType.EVENT_SERIES}
      size='medium'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a tag placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityType.TAG} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a user placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityType.USER} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})
