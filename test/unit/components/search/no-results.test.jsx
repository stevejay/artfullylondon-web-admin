import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchNoResults from '_src/components/search/no-results'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchNoResults entityType='event' onTryAllClick={_.noop} />
  )

  expect(wrapper).toMatchSnapshot()
})
