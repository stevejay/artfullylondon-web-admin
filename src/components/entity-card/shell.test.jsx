import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import EntityCardShell from '_src/components/entity-card/shell'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityCardShell
      entity={{
        id: 'some-id',
        entityType: 'venue',
        entityTypeLabel: 'The Label',
        url: 'http://some/url',
        image: '12345678',
        imageRatio: 2
      }}
      onImageLoad={_.noop}
    >
      <div id='child' />
    </EntityCardShell>
  )

  expect(wrapper).toMatchSnapshot()
})
