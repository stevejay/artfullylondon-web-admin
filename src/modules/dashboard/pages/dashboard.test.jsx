import React from 'react'
import _ from 'lodash'

import { DashboardPage } from '_src/modules/dashboard/pages/dashboard'
import * as entityConstants from '_src/constants/entity'
import * as dashboardActions from '_src/modules/dashboard/actions'

it('should render correctly while the entity counts are being fetched', () => {
  const wrapper = shallow(
    <DashboardPage
      entityCounts={[]}
      getInProgress
      getFailed={false}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when the entity counts have been fetched', () => {
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
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when fetching the entity counts failed', () => {
  const wrapper = shallow(
    <DashboardPage
      entityCounts={[]}
      getInProgress={false}
      getFailed
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should get the entity counts while it is being mounted', () => {
  const dispatch = jest.fn()

  shallow(
    <DashboardPage
      entityCounts={[]}
      getInProgress={false}
      getFailed={false}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(dashboardActions.getEntityCounts())
})
