import React from 'react'
import { shallow } from 'enzyme'

import ImageCredit from './image-credit'

it('should render correctly when there is a credit', () => {
  const wrapper = shallow(<ImageCredit credit='The Credit' />)
  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when there is no credit', () => {
  const wrapper = shallow(<ImageCredit />)
  expect(wrapper).toMatchSnapshot()
})
