import React from 'react'
import _ from 'lodash'

import { DashboardPage } from './dashboard'
import * as dashboardActions from '../actions'
import * as entityConstants from '_src/constants/entity'

it('should render correctly while the entity counts are being fetched', () => {
  const wrapper = shallow(
    <DashboardPage
      entityCounts={{}}
      getInProgress
      getFailed={false}
      dispatch={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when the entity counts have been fetched', () => {
  const wrapper = shallow(
    <DashboardPage
      entityCounts={{
        [entityConstants.ENTITY_TYPE_VENUE]: {
          entityType: entityConstants.ENTITY_TYPE_VENUE,
          count: 100
        }
      }}
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
      entityCounts={{}}
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
      entityCounts={{}}
      getInProgress={false}
      getFailed={false}
      dispatch={dispatch}
    />
  )

  expect(dispatch).toHaveBeenCalledWith(dashboardActions.getEntityCounts())
})
