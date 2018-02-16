import React from 'react'
import { Field } from 'redux-form'
import _ from 'lodash'

import { BasicSearchForm } from './basic-search'
import Form from '_src/components/form'
import * as searchActions from '../actions'
import * as browserConstants from '_src/constants/browser'

it('should render correctly', () => {
  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={_.noop}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  expect(wrapper).toMatchSnapshot()
})

it('should handle an autocomplete item being selected', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={dispatch}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.find(Field).at(0).prop('onAutocompleteSelect')({ id: 'some-id' })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.navigateToEntity({ id: 'some-id' })
  )
})

it('should handle an autocomplete search', () => {
  const dispatch = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={dispatch}
      handleSubmit={_.noop}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.find(Field).at(0).prop('onAutocompleteSearch')({ term: 'some term' })

  expect(dispatch).toHaveBeenCalledWith(
    searchActions.autocompleteSearch('some term', 'talent')
  )
})

it('should handle an Enter key press', () => {
  const handleSubmit = jest.fn()
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={_.noop}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.find(Form).simulate('keyPress', {
    charCode: browserConstants.ENTER_CHARCODE,
    preventDefault
  })

  expect(preventDefault).toHaveBeenCalled()
  expect(handleSubmit).toHaveBeenCalled()
})

it('should ignore a non-Enter key press', () => {
  const handleSubmit = jest.fn()
  const preventDefault = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={_.noop}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.find(Form).simulate('keyPress', {
    charCode: browserConstants.ENTER_CHARCODE + 1,
    preventDefault
  })

  expect(preventDefault).not.toHaveBeenCalled()
  expect(handleSubmit).not.toHaveBeenCalled()
})

it('should trigger submit when the entity type prop changes', () => {
  const handleSubmit = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={_.noop}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.instance().componentWillReceiveProps({
    entityTypeSelector: 'venue'
  })

  expect(handleSubmit).toHaveBeenCalled()
})

it('should not trigger submit when the entity type prop does not change', () => {
  const handleSubmit = jest.fn()

  const wrapper = shallow(
    <BasicSearchForm
      initialValues={{
        term: 'foo',
        entityType: 'event',
        skip: 10,
        take: 20
      }}
      entityTypeSelector='talent'
      submitting={false}
      dispatch={_.noop}
      handleSubmit={handleSubmit}
      onSubmit={_.noop}
      submit={_.noop}
    />
  )

  wrapper.instance().componentWillReceiveProps({
    entityTypeSelector: 'talent'
  })

  expect(handleSubmit).not.toHaveBeenCalled()
})
