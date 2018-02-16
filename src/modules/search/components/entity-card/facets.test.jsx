import React from 'react'

import EntityCardFacets from './facets'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardFacets>
      <div id='child' />
    </EntityCardFacets>
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardFacets>
      <div id='child' />
    </EntityCardFacets>
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
