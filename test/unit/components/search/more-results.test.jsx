import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchMoreResults from '_src/components/search/more-results'

it('should render correctly when has no more results', () => {
  const wrapper = shallow(
    <SearchMoreResults
      items={[{ entityType: 'event' }]}
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
        { entityType: 'event' },
        { entityType: 'event' },
        { entityType: 'event' }
      ]}
      take={3}
      onClick={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
