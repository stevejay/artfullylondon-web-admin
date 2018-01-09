import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { DashboardPage } from '_src/modules/dashboard/pages/dashboard'

it('should render correctly', () => {
  const entityCounts = [
    { entityType: 'venue', count: 100 },
    { entityType: 'talent', count: 200 },
    { entityType: 'event-series', count: 300 },
    { entityType: 'event', count: 400 }
  ]

  const wrapper = shallow(
    <DashboardPage
      entityCounts={entityCounts}
      getEntityCountsInProgress={false}
      getEntityCountsFailed={false}
      showQuicksearch={false}
      pushBasicSearchToUrl={_.noop}
      clearAutocomplete={_.noop}
      getEntityCounts={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
