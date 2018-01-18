import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { DashboardPage } from '_src/modules/dashboard/pages/dashboard'
import * as entityConstants from '_src/constants/entity'

it('should render correctly', () => {
  const entityCounts = [
    { entityType: entityConstants.ENTITY_TYPE_VENUE, count: 100 },
    { entityType: entityConstants.ENTITY_TYPE_TALENT, count: 200 },
    { entityType: entityConstants.ENTITY_TYPE_EVENT_SERIES, count: 300 },
    { entityType: entityConstants.ENTITY_TYPE_EVENT, count: 400 }
  ]

  const wrapper = shallow(
    <DashboardPage
      entityCounts={entityCounts}
      getInProgress={false}
      getFailed={false}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={_.noop}
      getEntityCounts={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
