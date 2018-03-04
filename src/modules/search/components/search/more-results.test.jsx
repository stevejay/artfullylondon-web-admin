import React from 'react'
import _ from 'lodash'

import SearchMoreResults from './more-results'

it('should render correctly when has no more results', () => {
  const wrapper = shallow(
    <SearchMoreResults
      items={[{ entityType: entityType.EVENT }]}
      take={20}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has more results', () => {
  const wrapper = shallow(
    <SearchMoreResults
      items={[
        { entityType: entityType.EVENT },
        { entityType: entityType.EVENT },
        { entityType: entityType.EVENT }
      ]}
      take={3}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
