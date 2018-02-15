import React from 'react'

import Statistic from '_src/modules/dashboard/components/statistic'

it('should render correctly', () => {
  const wrapper = shallow(<Statistic entityType='venue' count={300} />)
  expect(wrapper).toMatchSnapshot()
})
