import React from 'react'
import _ from 'lodash'

import { EntitySelectorSearch } from './entity-selector-search'
import entityType from '_src/domain/types/entity-type'
import SearchInput from '_src/shared/components/search-input'

it('should render correctly', () => {
  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={entityType.TALENT}
      inputValue='Some value'
      setInputValue={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle a select input change event', () => {
  const setInputValue = jest.fn()

  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={entityType.TALENT}
      inputValue='Some value'
      setInputValue={setInputValue}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  wrapper.find(SearchInput).simulate('change', { target: { value: 'foo' } })

  expect(setInputValue).toHaveBeenCalledWith('foo')
})

it('should handle an autocomplete search event', () => {
  const onAutocompleteSearch = jest.fn()

  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={entityType.TALENT}
      inputValue='Some value'
      setInputValue={_.noop}
      onAutocompleteSearch={onAutocompleteSearch}
      onAutocompleteSelect={_.noop}
    />
  )

  wrapper.find(SearchInput).prop('onAutocompleteSearch')({ term: 'foo' })

  expect(onAutocompleteSearch).toHaveBeenCalledWith('foo', entityType.TALENT)
})

it('should handle an autocomplete select event', () => {
  const onAutocompleteSelect = jest.fn()
  const setInputValue = jest.fn()

  const wrapper = shallow(
    <EntitySelectorSearch
      entityType={entityType.TALENT}
      inputValue='Some value'
      setInputValue={setInputValue}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={onAutocompleteSelect}
    />
  )

  wrapper.find(SearchInput).prop('onAutocompleteSelect')({
    id: 'some-id',
    name: 'foo'
  })

  expect(
    onAutocompleteSelect
  ).toHaveBeenCalledWith(entityType.TALENT, 'some-id', {
    id: 'some-id',
    name: 'foo'
  })

  expect(setInputValue).toHaveBeenCalledWith('')
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <EntitySelectorSearch
        entityType={entityType.TALENT}
        inputValue='Some value'
        setInputValue={_.noop}
        onAutocompleteSearch={_.noop}
        onAutocompleteSelect={_.noop}
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ inputValue: 'Some value' })

    expect(actual).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <EntitySelectorSearch
        entityType={entityType.TALENT}
        inputValue='Some value'
        setInputValue={_.noop}
        onAutocompleteSearch={_.noop}
        onAutocompleteSelect={_.noop}
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ inputValue: 'Other value' })

    expect(actual).toEqual(true)
  })
})
