import React from 'react'
import _ from 'lodash'

import { SummaryVenue } from '_src/domain/venue'
import SearchResults from './results'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchResults
      items={[new SummaryVenue({})]}
      total={200}
      skip={10}
      take={20}
      isAllSearch={false}
      dateStr='2017/01/18'
      onPageClick={_.noop}
      onMoreResultsClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
