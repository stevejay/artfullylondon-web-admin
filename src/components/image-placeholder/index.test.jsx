import React from 'react'
import { shallow } from 'enzyme'

import ImagePlaceholder from '_src/components/image-placeholder'
import * as entityConstants from '_src/constants/entity'

it('should render a venue placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityConstants.ENTITY_TYPE_VENUE} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a talent placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityConstants.ENTITY_TYPE_TALENT} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an event placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityConstants.ENTITY_TYPE_EVENT} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an event series placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder
      type={entityConstants.ENTITY_TYPE_EVENT_SERIES}
      size='medium'
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a tag placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityConstants.ENTITY_TYPE_TAG} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render a user placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type={entityConstants.ENTITY_TYPE_USER} size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})
