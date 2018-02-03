import React from 'react'
import { shallow } from 'enzyme'

import ImagePlaceholder from '_src/components/image-placeholder'

it('should render a venue placeholder image correctly', () => {
  const wrapper = shallow(<ImagePlaceholder type='venue' size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render a talent placeholder image correctly', () => {
  const wrapper = shallow(<ImagePlaceholder type='talent' size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render an event placeholder image correctly', () => {
  const wrapper = shallow(<ImagePlaceholder type='event' size='medium' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render an event series placeholder image correctly', () => {
  const wrapper = shallow(
    <ImagePlaceholder type='event-series' size='medium' />
  )

  expect(wrapper).toMatchSnapshot()
})
