import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { SummaryVenue } from '_src/entities/venue'
import SearchResults from '_src/components/search/results'

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

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const items = [new SummaryVenue({})]

    const wrapper = shallow(
      <SearchResults
        items={items}
        total={200}
        skip={10}
        take={20}
        isAllSearch={false}
        dateStr='2017/01/18'
        onPageClick={_.noop}
        onMoreResultsClick={_.noop}
        className='some-class'
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      items,
      dateStr: '2017/01/18',
      className: 'some-class'
    })

    expect(result).toEqual(false)
  })

  it('should update when props have changed', () => {
    const items = [new SummaryVenue({})]

    const wrapper = shallow(
      <SearchResults
        items={items}
        total={200}
        skip={10}
        take={20}
        isAllSearch={false}
        dateStr='2017/01/18'
        onPageClick={_.noop}
        onMoreResultsClick={_.noop}
        className='some-class'
      />
    )

    const result = wrapper.instance().shouldComponentUpdate({
      items,
      dateStr: '2018/12/12',
      className: 'some-class'
    })

    expect(result).toEqual(true)
  })
})
