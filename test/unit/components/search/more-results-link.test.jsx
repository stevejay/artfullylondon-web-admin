import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchMoreResultsLink from '_src/components/search/more-results-link'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchMoreResultsLink entityType='event' onClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
