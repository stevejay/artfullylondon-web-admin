import React from 'react'
import { shallow } from 'enzyme'

import EntityCardEntityTypeLabel
  from '_src/components/entity-card/entity-type-label'

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
