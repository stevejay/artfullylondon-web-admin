import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchField from '_src/components/search-field/field'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchField
      input={{ value: 'term', onChange: _.noop }}
      searchInProgress={false}
      maxLength={50}
      disabled={false}
      handleSubmit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
