import React from 'react'
import { shallow } from 'enzyme'
import _ from 'lodash'

import SearchInputAutocompleteItem
  from '_src/modules/search/components/search-input/autocomplete-item'
import * as searchConstants from '_src/constants/search-temp'

it('should render correctly an autocomplete entity that is not currently selected', () => {
  const wrapper = shallow(
    <SearchInputAutocompleteItem
      index={1}
      currentIndex={2}
      item={{
        autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY,
        id: 'some-id',
        name: 'Some Name',
        entityType: 'event',
        output: 'Some output'
      }}
      onSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly an autocomplete entity that is currently selected', () => {
  const wrapper = shallow(
    <SearchInputAutocompleteItem
      index={1}
      currentIndex={1}
      item={{
        autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY,
        id: 'some-id',
        name: 'Some Name',
        entityType: 'event',
        output: 'Some output'
      }}
      onSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a click on an item', () => {
  const handleSelect = jest.fn()
  const preventDefault = jest.fn()
  const stopPropagation = jest.fn()

  const item = {
    autocompleteItemType: searchConstants.AUTOCOMPLETE_ITEM_TYPE_ENTITY,
    id: 'some-id',
    name: 'Some Name',
    entityType: 'event'
  }

  const wrapper = shallow(
    <SearchInputAutocompleteItem
      index={1}
      currentIndex={2}
      item={item}
      onSelect={handleSelect}
    />
  )

  wrapper.find('a').simulate('click', { preventDefault, stopPropagation })

  expect(preventDefault).toHaveBeenCalled()
  expect(stopPropagation).toHaveBeenCalled()
  expect(handleSelect).toHaveBeenCalledWith(item)
})
