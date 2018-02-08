import React from 'react'
import { shallow } from 'enzyme'

import EntityCardEntityTypeLabel from './entity-type-label'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardEntityTypeLabel
      entity={{
        entityType: 'venue',
        entityTypeLabel: 'The Label'
      }}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should not update', () => {
  const wrapper = shallow(
    <EntityCardEntityTypeLabel
      entity={{
        entityType: 'venue',
        entityTypeLabel: 'The Label'
      }}
    />
  )

  const result = wrapper.instance().shouldComponentUpdate()
  expect(result).toEqual(false)
})
