import React from 'react'
import _ from 'lodash'

import SearchInputAutocompleteList
  from '_src/modules/search/components/search-input/autocomplete-list'
import * as searchConstants from '_src/constants/search-temp'

it('should render an autocomplete list with a single entity entry correctly', () => {
  const wrapper = shallow(
    <SearchInputAutocompleteList
      currentIndex={0}
      items={[
        {
          autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY,
          id: 'some-id',
          name: 'Some Name',
          entityType: 'event',
          output: 'Some output'
        }
      ]}
      onSelectItem={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render an autocomplete list with a single label entry correctly', () => {
  const wrapper = shallow(
    <SearchInputAutocompleteList
      currentIndex={0}
      items={[
        {
          autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_LABEL,
          label: 'Some label'
        }
      ]}
      onSelectItem={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
