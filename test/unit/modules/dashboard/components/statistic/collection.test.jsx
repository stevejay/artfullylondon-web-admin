import React from 'react'
import { shallow } from 'enzyme'

import StatisticCollection
  from '_src/modules/dashboard/components/statistic/collection'
import * as entityConstants from '_src/constants/entity'

it('should render correctly', () => {
  const entityCounts = [
    { entityType: entityConstants.ENTITY_TYPE_VENUE, count: 100 },
    { entityType: entityConstants.ENTITY_TYPE_TALENT, count: 200 },
    { entityType: entityConstants.ENTITY_TYPE_EVENT_SERIES, count: 300 },
    { entityType: entityConstants.ENTITY_TYPE_EVENT, count: 400 }
  ]

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when some entity counts are missing', () => {
  const entityCounts = [
    { entityType: entityConstants.ENTITY_TYPE_VENUE, count: 100 },
    { entityType: entityConstants.ENTITY_TYPE_TALENT, count: 200 }
  ]

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})

it('should not update if props do not change', () => {
  const entityCounts = []
  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)
  const result = wrapper.instance().shouldComponentUpdate({ entityCounts })
  expect(result).toEqual(false)
})

it('should update if props change', () => {
  const wrapper = shallow(<StatisticCollection entityCounts={[]} />)
  const result = wrapper.instance().shouldComponentUpdate({ entityCounts: [] })
  expect(result).toEqual(true)
})
