import React from 'react'
import _ from 'lodash'

import SearchInputField from './field'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchInputField
      input={{ value: 'some value', onChange: _.noop }}
      searchInProgress={false}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
