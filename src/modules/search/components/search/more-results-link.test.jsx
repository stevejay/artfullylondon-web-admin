import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchMoreResultsLink from '_src/modules/search/components/search/more-results-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchMoreResultsLink entityType='event' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle being clicked', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <SearchMoreResultsLink entityType='event' onClick={handleClick} />
  )

  wrapper.find('a').simulate('click')

  expect(handleClick).toHaveBeenCalledWith({ entityType: 'event' })
})
