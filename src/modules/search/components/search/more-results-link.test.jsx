import React from 'react'
import _ from 'lodash'

import SearchMoreResultsLink from './more-results-link'
import entityType from '_src/domain/types/entity-type'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchMoreResultsLink entityType={entityType.EVENT} onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle being clicked', () => {
  const handleClick = jest.fn()

  const wrapper = shallow(
    <SearchMoreResultsLink
      entityType={entityType.EVENT}
      onClick={handleClick}
    />
  )

  wrapper.find('a').simulate('click')

  expect(handleClick).toHaveBeenCalledWith({ entityType: entityType.EVENT })
})
