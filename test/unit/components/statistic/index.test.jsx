import React from 'react'
import { shallow } from 'enzyme'

import Statistic from '_src/components/statistic'

it('should render correctly', () => {
  const wrapper = shallow(<Statistic entityType='venue' count={300} />)
  expect(wrapper).toMatchSnapshot()
})
