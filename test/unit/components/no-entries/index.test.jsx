import React from 'react'
import { shallow } from 'enzyme'

import NoEntries from '_src/components/no-entries'

it('should render correctly', () => {
  const wrapper = shallow(<NoEntries />)
  expect(wrapper).toMatchSnapshot()
})
