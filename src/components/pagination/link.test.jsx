import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import PaginationLink from '_src/components/pagination/link'

it('should render correctly when is not current page', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={2}
      currentPageNumber={1}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when is current page', () => {
  const wrapper = shallow(
    <PaginationLink
      pageNumber={2}
      currentPageNumber={2}
      totalPages={10}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
