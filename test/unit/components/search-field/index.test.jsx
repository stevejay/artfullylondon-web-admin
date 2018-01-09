import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import { SearchField } from '_src/components/search-field'

it('should render correctly', () => {
  const autocompleteItems = [
    { autocompleteItemType: 'label', label: 'The Label' },
    {
      autocompleteItemType: 'entity',
      id: 'some-id',
      name: 'The Name',
      entityType: 'venue'
    }
  ]

  const wrapper = shallow(
    <SearchField
      value='term'
      onChange={_.noop}
      disabled={false}
      searchInProgress={false}
      maxLength={50}
      canShowAutocompleteItems
      autocompleteItems={autocompleteItems}
      search={_.noop}
      clearAutocomplete={_.noop}
      onFullSearch={_.noop}
      navigateToEntity={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
