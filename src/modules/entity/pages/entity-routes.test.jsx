import React from 'react'
import _ from 'lodash'

import EntityRoutes from './entity-routes'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntityRoutes
      entityType={entityType.TALENT}
      editOrCreateComponent={() => <div id='edit-or-create' />}
      detailComponent={() => <div id='detail' />}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
