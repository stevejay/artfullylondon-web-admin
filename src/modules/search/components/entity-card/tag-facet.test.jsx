import React from 'react'

import EntityCardTagFacet from './tag-facet'

it('should render a default tag facet correctly', () => {
  const wrapper = shallow(
    <EntityCardTagFacet>
      <div id='child' />
    </EntityCardTagFacet>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an error tag facet correctly', () => {
  const wrapper = shallow(
    <EntityCardTagFacet type='error'>
      <div id='child' />
    </EntityCardTagFacet>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardTagFacet type='error'>
      <div id='child' />
    </EntityCardTagFacet>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
