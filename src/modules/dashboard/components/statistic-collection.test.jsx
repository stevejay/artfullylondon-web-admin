import React from 'react'

import StatisticCollection from './statistic-collection'
import * as entityConstants from '_src/constants/entity'

it('should render correctly', () => {
  const entityCounts = {
    [entityConstants.ENTITY_TYPE_VENUE]: { count: 100 },
    [entityConstants.ENTITY_TYPE_TALENT]: { count: 200 },
    [entityConstants.ENTITY_TYPE_EVENT_SERIES]: { count: 300 },
    [entityConstants.ENTITY_TYPE_EVENT]: { count: 400 }
  }

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when some entity counts are missing', () => {
  const entityCounts = {
    [entityConstants.ENTITY_TYPE_VENUE]: { count: 100 },
    [entityConstants.ENTITY_TYPE_TALENT]: { count: 200 }
  }

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})
