import React from 'react'
import { shallow } from 'enzyme'

import MonitorDiff from '_src/components/monitor/diff'

it('should render correctly', () => {
  const wrapper = shallow(<MonitorDiff changeDiff='The Diff' />)
  expect(wrapper).toMatchSnapshot()
})
