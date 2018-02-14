import React from 'react'
import { shallow } from 'enzyme'

import MonitorDiff from './diff'

it('should render correctly when there is a diff', () => {
  const wrapper = shallow(<MonitorDiff changeDiff='The Diff' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no diff', () => {
  const wrapper = shallow(<MonitorDiff />)
  expect(wrapper).toMatchSnapshot()
})
