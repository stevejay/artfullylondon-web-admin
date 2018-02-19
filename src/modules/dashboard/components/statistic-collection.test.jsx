import React from 'react'

import StatisticCollection from './statistic-collection'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  const entityCounts = {
    [entityType.VENUE]: { count: 100 },
    [entityType.TALENT]: { count: 200 },
    [entityType.EVENT_SERIES]: { count: 300 },
    [entityType.EVENT]: { count: 400 }
  }

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when some entity counts are missing', () => {
  const entityCounts = {
    [entityType.VENUE]: { count: 100 },
    [entityType.TALENT]: { count: 200 }
  }

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})
