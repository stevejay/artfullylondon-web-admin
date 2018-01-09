import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import Pagination from '_src/components/pagination'

it('should render correctly', () => {
  const wrapper = shallow(
    <Pagination skip={10} take={5} total={100} onPageClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when total is less than take', () => {
  const wrapper = shallow(
    <Pagination skip={10} take={5} total={1} onPageClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
