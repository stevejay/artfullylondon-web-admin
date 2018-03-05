import React from 'react'
import _ from 'lodash'

import { EntitySelector } from './entity-selector'
import entityType from '_src/domain/types/entity-type'
import EntitySelectorSearch from './entity-selector-search'

it('should render correctly when getting an entity', () => {
  const wrapper = shallow(
    <EntitySelector
      entityType={entityType.TALENT}
      label='The Label'
      value={null}
      touched={false}
      gettingEntity
      setGettingEntity={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has no entity', () => {
  const wrapper = shallow(
    <EntitySelector
      entityType={entityType.TALENT}
      label='The Label'
      value={null}
      touched={false}
      gettingEntity={false}
      setGettingEntity={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should render correctly when has an entity', () => {
  const wrapper = shallow(
    <EntitySelector
      entityType={entityType.TALENT}
      label='The Label'
      value={{
        id: 'some-id',
        name: 'Some Name'
      }}
      touched={false}
      gettingEntity={false}
      setGettingEntity={_.noop}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle an autocomplete select event', () => {
  const onAutocompleteSelect = jest.fn().mockReturnValue(Promise.resolve())

  const setGettingEntity = jest
    .fn()
    .mockReturnValueOnce()
    .mockReturnValueOnce(Promise.resolve())

  const wrapper = shallow(
    <EntitySelector
      entityType={entityType.TALENT}
      label='The Label'
      value={{
        id: 'some-id',
        name: 'Some Name'
      }}
      touched={false}
      gettingEntity={false}
      setGettingEntity={setGettingEntity}
      onAutocompleteSearch={_.noop}
      onAutocompleteSelect={onAutocompleteSelect}
    />
  )

  return wrapper
    .find(EntitySelectorSearch)
    .prop('onAutocompleteSelect')(entityType.TALENT, 'foo-id', {
      id: 'foo-id',
      name: 'foo'
    })
    .then(() => {
      expect(
        onAutocompleteSelect
      ).toHaveBeenCalledWith(entityType.TALENT, 'foo-id', {
        id: 'foo-id',
        name: 'foo'
      })

      expect(setGettingEntity).toHaveBeenCalledWith(true)
      expect(setGettingEntity).toHaveBeenCalledWith(false)
    })
})

describe('shouldComponentUpdate', () => {
  it('should not update when props have not changed', () => {
    const wrapper = shallow(
      <EntitySelector
        entityType={entityType.TALENT}
        label='The Label'
        value={null}
        touched={false}
        gettingEntity
        setGettingEntity={_.noop}
        onAutocompleteSearch={_.noop}
        onAutocompleteSelect={_.noop}
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ value: null, gettingEntity: true })

    expect(actual).toEqual(false)
  })

  it('should update when props have changed', () => {
    const wrapper = shallow(
      <EntitySelector
        entityType={entityType.TALENT}
        label='The Label'
        value={null}
        touched={false}
        gettingEntity
        setGettingEntity={_.noop}
        onAutocompleteSearch={_.noop}
        onAutocompleteSelect={_.noop}
      />
    )

    const actual = wrapper
      .instance()
      .shouldComponentUpdate({ value: null, gettingEntity: false })

    expect(actual).toEqual(true)
  })
})
