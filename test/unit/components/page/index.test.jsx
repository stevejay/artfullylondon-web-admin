import React from 'react'
import { shallow } from 'enzyme'

import Page from '_src/components/page'

it('should render correctly', () => {
  const wrapper = shallow(<Page><div id='child' /></Page>)
  expect(wrapper).toMatchSnapshot()
})
