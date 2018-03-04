import React from 'react'
import _ from 'lodash'

import SearchInputAutocompleteList from './autocomplete-list'
import autocompleteItemType from '_src/domain/types/autocomplete-item-type'

it('should render an autocomplete list with a single entity entry correctly', () => {
  const wrapper = shallow(
    <SearchInputAutocompleteList
      currentIndex={0}
      items={[
        {
          autocompleteItemType: autocompleteItemType.ENTITY,
          id: 'some-id',
          name: 'Some Name',
          entityType: entityType.EVENT,
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
          autocompleteItemType: autocompleteItemType.LABEL,
          label: 'Some label'
        }
      ]}
      onSelectItem={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})
