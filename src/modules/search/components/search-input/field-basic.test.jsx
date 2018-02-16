import React from 'react'
import _ from 'lodash'

import SearchInputFieldBasic from './field-basic'

it('should render correctly', () => {
  const wrapper = shallow(
    <SearchInputFieldBasic
      input={{ value: 'some value', onChange: _.noop }}
      searchInProgress={false}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
