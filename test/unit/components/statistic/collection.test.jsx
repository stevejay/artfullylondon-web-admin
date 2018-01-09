import React from 'react'
import { shallow } from 'enzyme'

import StatisticCollection from '_src/components/statistic/collection'

it('should render correctly', () => {
  const entityCounts = [
    { entityType: 'venue', count: 100 },
    { entityType: 'talent', count: 200 },
    { entityType: 'event-series', count: 300 },
    { entityType: 'event', count: 400 }
  ]

  const wrapper = shallow(<StatisticCollection entityCounts={entityCounts} />)

  expect(wrapper).toMatchSnapshot()
})
